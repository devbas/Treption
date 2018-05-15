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
  JWTManager, jwt_required, create_access_token,
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
        sql = "INSERT INTO `document` (`sentence_count`, `value`, `color`, `owner_id`) VALUES (%s, %s, %s, %s)" 
        cursor.execute(sql, (len(sentences), content, documentColor, 1))
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


def getDocuments(): 
  
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  try:

    aggregatedDocuments = []
    with connection.cursor() as cursor: 
      cursor.execute("SELECT * FROM document")
      documents = cursor.fetchall()

    for document in documents:
      documentId = document[0]
      sentenceAmount = document[1]

      aggregatedDocument = {
        'documentId': documentId, 
        'value': document[3],
        'color': document[4],
        'sentences': [], 
        'sentenceCount': document[1]
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
  
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  try: 

    with connection.cursor() as cursor: 
      sql = "SELECT * FROM sentence WHERE sentence_id = %s"
      cursor.execute(sql, (sentenceId))
      sentence = cursor.fetchone()
    
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

  finally: 
    connection.close() 
    return 'done' 

