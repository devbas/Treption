import nltk
from nltk.tag.stanford import CoreNLPPOSTagger  
from pprint import pprint
import pymysql.cursors
import sys
from flask import jsonify,json
import datetime

def POSTagger(content): 
  result = CoreNLPPOSTagger(url='http://postagger:9000').tag(content.split())
  if result:
    return result

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

    connection = pymysql.connect(host='db', user='root', password='root', db='treption')

    try: 
      with connection.cursor() as cursor:
        sql = "INSERT INTO `document` (`sentence_count`, `value`) VALUES (%s, %s)"
        
        cursor.execute(sql, (sentenceAmount, content))
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

      aggregatedDocuments.append(aggregatedDocument)

  finally: 
    connection.close()
    jsonDocuments = json.dumps(aggregatedDocuments)
    return jsonDocuments