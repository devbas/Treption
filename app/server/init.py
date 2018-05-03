from flask import Flask, request, jsonify
from utils import POSTagger, createDocument, getDocuments, getDocument, getSentence, createPredicate, getPredicates
from rdf import createTriple
from pprint import pprint
import sys

app = Flask(__name__)

@app.route("/")
def hello(): 
  return "Be Amazed me too"

ALLOWED_EXTENSIONS = set(['txt', 'rtf'])

@app.route("/upload", methods=['GET'])
def serveUploadForm(): 
  return '''
    <!doctype html>
    <title>Upload new Text</title>
    <h1>Upload new Text (txt)</h1>
    <form method=post enctype=multipart/form-data action=/api/upload>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

@app.route("/api/upload/text", methods=['POST'])
def uploadedText(): 
  result = createDocument(request.form['text'])
  return result

@app.route("/api/upload/document", methods=['POST', 'GET'])
def uploadFile():
  if request.method == 'POST':  
    
    #if 'file' not in request.files:
    #  return "No file found"
    
    uploadedFile = request.form
    #content = uploadedFile.read()
    #file_lines = [line.decode("utf-8") for line in content.file]
    return uploadedFile

@app.route("/api/documents", methods=['GET'])
def fetchDocuments(): 
  documents = getDocuments()
  return jsonify(Documents=documents)
  # Returns document, sentence, sentence_word, triple, predicate, actions, user

@app.route("/api/document/<documentId>", methods=['GET'])
def fetchDocument(documentId): 
  #documentId = request.args['documentId']
  print('documentId: ' + str(type(documentId)), file=sys.stderr)
  document = getDocument(documentId)
  return jsonify(Document=document)

@app.route("/api/sentence/<documentId>/<sentenceId>", methods=['GET'])
def fetchSentence(documentId, sentenceId): 
  sentence = getSentence(documentId, sentenceId)
  return jsonify(Sentence=sentence)

@app.route("/api/predicate", methods=['POST'])
def addPredicate(): 
  if request.form['predicate']: 
    predicate = createPredicate(request.form['predicate'])
    return jsonify(Predicate=predicate)
  else: 
    return 0

@app.route("/api/predicates", methods=['GET'])
def fetchPredicates(): 
  predicates = getPredicates()
  return jsonify(Predicates=predicates)

@app.route("/api/triple", methods=['POST'])
def saveTriple(): 
  # Saves triple, action, (predicate)
  subject = request.form['subject']
  predicate = request.form['predicate']
  objectValue = request.form['object']

  triple = createTriple(subject, predicate, objectValue)
  return 'done' 

@app.route("/api/user", methods=['POST'])
def saveUser(): 
  # Saves user
  return 1 

#@app.route("/api/save-extraction", methods=['POST'])
#def saveExtraction(): 
  # Save extraction with document ID and user ID  

if __name__ == '__main__': 
  app.run(debug=True)