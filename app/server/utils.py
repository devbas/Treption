from pycorenlp import *
from pprint import pprint
import pymysql.cursors
import sys
from flask import jsonify
import json
import datetime
import random
import colorsys

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

def createDocument(content): 
  if content:
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
        sql = "INSERT INTO `document` (`sentence_count`, `value`, `color`) VALUES (%s, %s, %s)"    
        cursor.execute(sql, (sentenceAmount, content, documentColor))
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

    finally: 
      connection.close()
      return 'done'

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
        'sentences': []
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

