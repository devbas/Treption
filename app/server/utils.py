from pycorenlp import *
from pprint import pprint
import pymysql.cursors
import sys
from flask import jsonify
import json
import datetime
import random
import colorsys
import random
import string
from flask_jwt_extended import (
  JWTManager, jwt_required, create_access_token, create_refresh_token,
  get_jwt_identity
)
import bcrypt
import requests 

def CoreNLPController(text): 
  nlp = StanfordCoreNLP('http://postagger:9000') 

  output = nlp.annotate(text, properties={"annotators":"tokenize,pos,openie,relation,parse", "outputFormat": "json","openie.triple.strict":"true","openie.max_entailments_per_clause":"1"})

  return output['sentences']

def idGenerator(size=10, chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))

def saveDependencies(sentence, graphId): 
  #sentences = CoreNLPController(content)

  # First we store the dependencies in Jena Fuseki
  triples = []

  dependencies = sentence['collapsed-ccprocessed-dependencies']

  # Building the triple according to the Stanford Dependencies Manual: https://nlp.stanford.edu/software/dependencies_manual.pdf
  for dep in dependencies: 
    if dep['governor'] > 0: 
      triple = []
      triple.insert(0, dep['governorGloss'])
      triple.insert(1, dep['dep'])
      triple.insert(2, dep['dependentGloss'])
      triples.append(triple)
    
  # Build Insert query
  query = 'PREFIX trp: <http://www.treption.com/' + graphId + '#> INSERT DATA { '
  for triple in triples:
    if triple[1] != 'punct':
      query = query + 'trp:' + triple[0] + ' trp:' + triple[1] + ' trp:' + triple[2] + ' . '

  query = query + '}'

  response = requests.post('http://fuseki:3030/treption/update', data={'update': query})

def saveAutoExtractions(sentence, graphId, sentenceId): 

  # Build insert query 
  query = 'PREFIX trp: <http://www.treption.com/' + graphId + '#> INSERT DATA { '

  if sentence['openie']:
    triples = sentence['openie']

    for triple in triples: 
      query = query + 'trp:' + triple['subject'] + ' trp:' + triple['relation'] + ' trp:' + triple['object'] + ' . '
  
  query = query + '}'

  print('query' + query, file=sys.stderr)

  response = requests.post('http://fuseki:3030/treption/update', data={'update': query})

  # Save to MySQL for Human Computation 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  sql = 'INSERT INTO `triple` (`subject`, `predicate`, `object`, `sentence_id`) VALUES '
  queryArgs = []

  if sentence['openie']:
    triples = sentence['openie']

    for index, triple in enumerate(triples): 
      sql = sql + '(%s, %s, %s, %s)'

      if index + 1 < len(triples): 
        sql = sql + ','
      else: 
        sql = sql + ';'
      
      queryArgs.append(triple['subject'])
      queryArgs.append(triple['relation'])
      queryArgs.append(triple['object'])
      queryArgs.append(sentenceId)

    print('SQL: ', sql, file=sys.stderr)
    with connection.cursor() as cursor: 
      cursor.execute(sql, queryArgs)
    
    connection.commit()


def createDocument(content): 
  if content:
    graphId = idGenerator()
    documentColor = rainbow()
    sentences = CoreNLPController(content)

    # Create document
    connection = pymysql.connect(host='db', user='root', password='root', db='treption')

    try: 
      with connection.cursor() as cursor: 
        sql = "INSERT INTO `document` (`sentence_count`, `value`, `color`, `owner_id`, `graph_id`) VALUES (%s, %s, %s, %s, %s)" 
        cursor.execute(sql, (len(sentences), content, documentColor, 1, graphId))
        documentId = cursor.lastrowid
      
      connection.commit()

      for index, sentence in enumerate(sentences): 

        with connection.cursor() as cursor: 
          sql = "INSERT INTO `sentence` (`document_id`, `word_count`, `document_position`) VALUES (%s, %s, %s)"
          cursor.execute(sql, (documentId, len(sentence), index))
          sentenceId = cursor.lastrowid

        connection.commit()

        saveDependencies(sentence, graphId)
        saveAutoExtractions(sentence, graphId, sentenceId)
      
        for wordIndex, pos in enumerate(sentence['tokens']): 
          with connection.cursor() as cursor: 
            sql = "INSERT INTO `sentence_word` (`sentence_id`, `word_position`, `value`, `pos`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (sentenceId, wordIndex, pos['originalText'], pos['pos']))
          
          connection.commit()
      
      response = {
        'documentId': documentId
      }

      return json.dumps(response)
    
    finally: 
      connection.close()

  else: 
    return 0


def getDocuments(userId): 
  
  connection = pymysql.connect(host='db', user='root', password='root', db='treption', cursorclass=pymysql.cursors.DictCursor)

  try:

    aggregatedDocuments = []
    with connection.cursor() as cursor: 
      cursor.execute('''SELECT *, 
                          (SELECT COUNT(*)
                            FROM vote V 
                            JOIN triple T 
                            ON V.triple_id = T.triple_id 
                            JOIN sentence S 
                            ON T.sentence_id = S.sentence_id 
                            JOIN document D1 
                            ON S.document_id = D1.document_id 
                            WHERE D1.document_id = D.document_id 
                            AND V.user_id = %s
                          ) AS total_votes, 
                          (SELECT COUNT(DISTINCT A.action_value)
                            FROM action A 
                            JOIN sentence S 
                            ON A.action_value = S.sentence_id 
                            JOIN document D2
                            ON S.document_id = D2.document_id 
                            WHERE A.action_key = 'sentenceExtracted'
                            AND A.user_id = %s
                            AND D2.document_id = D.document_id 
                          ) as number_of_sentences_extracted, 
                          (SELECT MIN(S.sentence_id)
                            FROM sentence S 
                            JOIN document D3
                            ON S.document_id = D3.document_id 
                            WHERE D3.document_id = D.document_id 
                            AND S.sentence_id > (
                              SELECT MAX(action_value)
                              FROM action A 
                              JOIN sentence S1 
                              ON A.action_value = S1.sentence_id
                              WHERE A.action_key = 'sentenceExtracted'
                              AND A.user_id = %s
                            )
                          ) AS next_sentence_id
                        FROM document D''', (userId, userId, userId))
      documents = cursor.fetchall()

    for document in documents:
      documentId = document['document_id']
      sentenceAmount = document['sentence_count']

      aggregatedDocument = {
        'documentId': documentId, 
        'value': document['value'],
        'color': document['color'],
        'sentences': [], 
        'sentenceCount': document['sentence_count'], 
        'totalVotes': document['total_votes'], 
        'numberOfSentencesExtracted': document['number_of_sentences_extracted'], 
        'nextSentenceId': document['next_sentence_id']
      }

      aggregatedDocuments.append(aggregatedDocument)

  finally: 
    connection.close()
    jsonDocuments = json.dumps(aggregatedDocuments)
    return jsonDocuments

def getDocument(documentId): 
  
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  try: 

    with connection.cursor() as cursor: 
      sql = "SELECT * FROM document WHERE document_id = %s"
      cursor.execute(sql, (documentId))
      document = cursor.fetchone()
    
    #print('Document params: ', document, file=sys.stderr)

    aggregatedDocument = {
      'documentId': documentId, 
      'value': document[3],
      'color': document[4],
      'sentences': []
    }
    
    with connection.cursor() as cursor: 
      sql = "SELECT * FROM sentence WHERE document_id = %s"
      cursor.execute(sql, (documentId))
      sentences = cursor.fetchall()

    for sentence in sentences: 
      sentenceId = sentence[0]

      aggregatedSentence = {
        'sentenceId': sentenceId, 
        'wordCount': sentence[2], 
        'documentPosition': sentence[3], 
        'words': []
      }

      with connection.cursor() as cursor: 
        sql = "SELECT * FROM sentence_word WHERE sentence_id = %s"
        cursor.execute(sql, (sentenceId))
        words = cursor.fetchall()
      
      for word in words: 
        aggregatedWord = {
          'id': word[0], 
          'position': word[2], 
          'value': word[3], 
          'pos': word[4]
        }

        aggregatedSentence['words'].append(aggregatedWord)

      aggregatedDocument['sentences'].append(aggregatedSentence)

  finally: 
    connection.close()

    jsonDocument = json.dumps(aggregatedDocument)
    return jsonDocument

def getSentence(documentId, sentenceId): 
  
  connection = pymysql.connect(host='db', user='root', password='root', db='treption', cursorclass=pymysql.cursors.DictCursor)

  try: 

    with connection.cursor() as cursor: 
      sql = '''SELECT *, 
                (SELECT MAX(sentence_id)
                FROM sentence
                WHERE sentence_id < %s
                AND document_id = %s
                ) as previous_sentence, 
                (SELECT MIN(sentence_id) 
                FROM sentence 
                WHERE sentence_id > %s
                AND document_id = %s
                ) as next_sentence
              FROM sentence 
              WHERE sentence_id = %s
              AND document_id = %s'''
      cursor.execute(sql, (sentenceId, documentId, sentenceId, documentId, sentenceId, documentId))
      sentence = cursor.fetchone()
    
    aggregatedSentence = {
      'sentenceId': sentenceId, 
      'wordCount': sentence['word_count'], 
      'documentPosition': sentence['document_position'], 
      'prevSentence': sentence['previous_sentence'],
      'nextSentence': sentence['next_sentence'],
      'words': []
    }

    with connection.cursor() as cursor: 
      sql = "SELECT * FROM sentence_word WHERE sentence_id = %s"
      cursor.execute(sql, (sentenceId))
      words = cursor.fetchall()
    
    for word in words: 
      aggregatedWord = {
        'id': word['word_id'], 
        'position': word['word_position'], 
        'value': word['value'], 
        'pos': word['pos']
      }

      aggregatedSentence['words'].append(aggregatedWord)
  
  finally: 
    connection.close()
    jsonDocument = json.dumps(aggregatedSentence)
    return jsonDocument

def createPredicate(predicate): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')
    
  try: 
    with connection.cursor() as cursor:
      sql = "INSERT INTO `predicate` (`value`) VALUES (%s)"    
      cursor.execute(sql, (predicate))
      predicateId = cursor.lastrowid

    connection.commit()
  
  finally: 
    connection.close()
    print('predicate: ' + predicate + '   ' + str(predicateId), file=sys.stderr)
    jsonPredicate = json.dumps({ 'value': predicate, 'predicateId': predicateId })
    return jsonPredicate

def getPredicates(): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  try:

    with connection.cursor() as cursor: 
      cursor.execute("SELECT * FROM predicate")
      predicates = cursor.fetchall()
  
  finally: 
    connection.close()
    jsonPredicates = json.dumps(predicates)
    return jsonPredicates

def getTriples(sentenceId): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption', cursorclass=pymysql.cursors.DictCursor)

  try: 
    with connection.cursor() as cursor:
      sql = "SELECT * FROM triple WHERE sentence_id = %s"
      cursor.execute(sql, sentenceId)
      triples = cursor.fetchall()
    
    connection.commit()
  
  finally: 
    connection.close() 
    jsonTriples = json.dumps(triples) 
    return jsonTriples



def rainbow(): 
  h,s,l = random.random(), 0.5 + random.random()/2.0, 0.4 + random.random()/5.0
  rainbow = [int(256*i) for i in colorsys.hls_to_rgb(h,l,s)] # R, G, B
  jsonRainbow = ','.join(str(e) for e in rainbow)
  print('jsonRainwob: ' + jsonRainbow, file=sys.stderr)
  return str(jsonRainbow)

class UserObject:
  def __init__(self, email, id):
    self.email = email
    self.id = id

def findOrCreateUser(email, password): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')
  hashed = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

  try: 

    with connection.cursor() as cursor: 
      cursor.execute("SELECT * FROM user WHERE email = %s", (email))
      account = cursor.fetchone()

    if not account:
      with connection.cursor() as cursor: 
        sql = "INSERT INTO `user` (`email`, `password`) VALUES (%s, %s)"
        cursor.execute(sql, (email, hashed))
        userId = cursor.lastrowid

      connection.commit()

      user = UserObject(email=email, id=userId)
    
      access_token = create_access_token(identity=user)
      return access_token
    
    else: 

      accountPassword = account[3]
      if bcrypt.checkpw(password.encode('utf8'), accountPassword.encode('utf8')):
        user = UserObject(email=email, id=account[0])
    
        access_token = create_access_token(identity=user)
        return access_token
      else: 
        return 0

  finally: 
    connection.close()

def createUserAction(key, value, userId): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  try: 
    with connection.cursor() as cursor: 
      cursor.execute("INSERT INTO `action` (`timestamp`, `user_id`, `action_key`, `action_value`) VALUES (NOW(), %s, %s, %s)", (userId, key, value) )

    connection.commit()
  
  finally: 
    connection.close()
    return 'done'

def getLastEditedDocument(userId): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption', cursorclass=pymysql.cursors.DictCursor)

  try: 
    with connection.cursor() as cursor: 
      cursor.execute("SELECT action_key, action_value FROM action WHERE user_id = %s AND action_key = %s ORDER BY timestamp DESC LIMIT 0,1", (userId, 'documentExtractClick'))
      lastEditedDocument = cursor.fetchone()
    
    return lastEditedDocument
  
  finally: 
    connection.close()

def createTripleVote(userId, tripleId, choice): 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption', cursorclass=pymysql.cursors.DictCursor)
  
  try: 
    if choice == 'agree': 
      voteBoolean = True 
    else: 
      voteBoolean = False
    
    with connection.cursor() as cursor: 
      sql = "INSERT INTO `vote` (`agree`, `user_id`, `timestamp`, `triple_id`) VALUES (%s, %s, NOW(), %s)"
      cursor.execute(sql, (voteBoolean, userId, tripleId) )

    connection.commit() 

    # Calculate with majority voting whether to push triple to Jena or not
    with connection.cursor() as cursor: 
      sql = '''SELECT DISTINCT(T.triple_id), T.subject, T.predicate, T.object, D.graph_id,
                  (SELECT COUNT(*) 
                  FROM vote V
                    WHERE V.agree = true) AS agree, 
                  (SELECT COUNT(*)
                    FROM vote V 
                    WHERE V.agree = false) as disagree
                FROM vote V 
                JOIN triple T 
                ON T.triple_id = V.triple_id
                JOIN sentence S
                ON T.sentence_id = S.sentence_id 
                JOIN document D 
                ON S.document_id = D.document_id
                WHERE T.triple_id = %s'''
      cursor.execute(sql, (tripleId))
      triple = cursor.fetchone()

    if triple['agree'] > triple['disagree']: 
      query = 'PREFIX trp: <http://www.treption.com/' + triple['graph_id'] + '#> INSERT DATA { trp:' + triple['subject'].replace(' ', '-') + ' trp:' + triple['predicate'].replace(' ', '-') + ' trp:' + triple['object'].replace(' ', '-') + ' }'
    else: 
      query = 'PREFIX trp: <http://www.treption.com/' + triple['graph_id'] + '#> DELETE DATA { trp:' + triple['subject'].replace(' ', '-') + ' trp:' + triple['predicate'].replace(' ', '-') + ' trp:' + triple['object'].replace(' ', '-') + ' }'

    response = requests.post('http://fuseki:3030/treption/update', data={'update': query})
    print('Fuseki response: ' + str(response) + ' ' + query, file=sys.stderr)


  finally: 
    connection.close() 
    return 'done' 

