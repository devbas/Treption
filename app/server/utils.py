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

def POSTagger(text):
  nlp = StanfordCoreNLP('http://postagger:9000') 

  output = nlp.annotate(text, properties={"annotators":"pos", "outputFormat": "json","openie.triple.strict":"true","openie.max_entailments_per_clause":"1"})
  posResult = [output["sentences"][0]["tokens"] for item in output]

  posTokens = []
  for j in posResult: 
    for value in j: 
        posToken=value['word'],value['pos']
        posTokens.append(posToken)
  
  return posTokens

def CoreNLPController(text): 
  nlp = StanfordCoreNLP('http://postagger:9000') 

  output = nlp.annotate(text, properties={"annotators":"tokenize,pos,openie,relation,parse", "outputFormat": "json","openie.triple.strict":"true","openie.max_entailments_per_clause":"1"})

  return output['sentences']

def idGenerator(size=10, chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))

def saveDependencies(sentences, graphId): 
  #sentences = CoreNLPController(content)

  # First we store the dependencies in Jena Fuseki
  triples = []

  for sentence in sentences: 
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

def saveAutoExtractions(sentences, graphId): 

  # Build insert query 
  query = 'PREFIX trp: <http://www.treption.com/' + graphId '#> INSERT DATA { '

  for sentence in sentences: 
    if sentence['openie']:
      triples = sentence['openie']

      for triple in triples: 
        query = query + 'trp:' + triple['subject'] + ' trp:' + triple['relation'] + ' trp:' + triple['object'] + ' . '
  
  query = query + '}'

  response = requests.post('http://fuseki:3030/treption/update', data={'update': query})

  # Save to MySQL for Human Computation 
  connection = pymysql.connect(host='db', user='root', password='root', db='treption')

  sql = 'INSERT INTO `triple` (`subject`, `predicate`, `object`, `sentence_id`) VALUES '
  queryArgs = []

  '''for sentence in sentences: 
    if sentence['openie']:
      triples = sentence['openie']

      for triple in triples: 
        sql = sql + '(%s, %s, %s, %s)'
        queryArgs.append(triple['subject'])
        queryArgs.append(triple['relation'])
        queryArgs.append(triple['object'])
        queryArgs.append(triple['sentenceId'])'''


def createDocument(content): 
  if content:
    graphId = idGenerator()

    sentences = CoreNLPController(content)

    saveDependencies(sentences, graphId)
    saveAutoExtractions(sentences, graphId)

    tokens = POSTagger(content)

    sentences = []
    sentence = [] # initiate with the first sentence

    sentences.append(sentence)
    for index, (x, y) in enumerate(tokens): 
      # add word to existing sentence
      sentences[-1].append((x, y))

      if x == '.' and y == '.' and len(tokens) > index + 1: 
        # add new sentence to list
        sentence = []
        sentences.append(sentence)

    sentenceAmount = len(sentences)
    documentColor = rainbow()

    
    connection = pymysql.connect(host='db', user='root', password='root', db='treption')
    
    try: 
      with connection.cursor() as cursor:
        sql = "INSERT INTO `document` (`sentence_count`, `value`, `color`, `owner_id`) VALUES (%s, %s, %s, %s)"    
        cursor.execute(sql, (sentenceAmount, content, documentColor, 1))
        documentId = cursor.lastrowid

      connection.commit()

      for index, sentence in enumerate(sentences): 

        with connection.cursor() as cursor: 
          # add sentence to document
          sql = "INSERT INTO `sentence` (`document_id`, `word_count`, `document_position`) VALUES (%s, %s, %s)"
          cursor.execute(sql, (documentId, len(sentence), index))
          sentenceId = cursor.lastrowid

        connection.commit()

        # add words to sentence
        for index, (value, pos) in enumerate(sentence): 
          with connection.cursor() as cursor: 
            sql = "INSERT INTO `sentence_word` (`sentence_id`, `word_position`, `value`, `pos`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (sentenceId, index, value, pos))
        
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

def rainbow(): 
  h,s,l = random.random(), 0.5 + random.random()/2.0, 0.4 + random.random()/5.0
  rainbow = [int(256*i) for i in colorsys.hls_to_rgb(h,l,s)] # R, G, B
  jsonRainbow = ','.join(str(e) for e in rainbow)
  print('jsonRainwob: ' + jsonRainbow, file=sys.stderr)
  return str(jsonRainbow)

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
    
      access_token = create_access_token(identity=email)
      return access_token
    
    else: 

      accountPassword = account[3]
      if bcrypt.checkpw(password.encode('utf8'), accountPassword.encode('utf8')):
        access_token = create_access_token(identity=email)
        return access_token
      else: 
        return 0

  finally: 
    connection.close()
