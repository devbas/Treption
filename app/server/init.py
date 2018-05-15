from flask import Flask, request, jsonify
from utils import createDocument, getDocuments, getDocument, getSentence, createPredicate, getPredicates, findOrCreateUser
from rdf import createTriple
from pprint import pprint
import sys
from flask_jwt_extended import (
  jwt_required, 
  JWTManager
)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['JWT_TOKEN_LOCATION'] = 'cookies'
app.config['JWT_ACCESS_COOKIE_NAME'] = 'accessToken'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False 
jwt = JWTManager(app)

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
@jwt_required
def uploadedText(): 
  result = createDocument(request.form['text'])
  return result

@app.route("/api/upload/document", methods=['POST'])
@jwt_required
def uploadFile():
    if 'file' not in request.files:
      return "No file found"

    #current_user = get_jwt_identity()
    print('Current user: ', file=sys.stderr)

    uploadedFile = request.files['file']

    content = uploadedFile.read()
    content = content.decode("utf-8")
    documentId = createDocument(content)
    return jsonify(DocumentId=documentId)

@app.route("/api/documents", methods=['GET'])
def fetchDocuments(): 
  documents = getDocuments()
  return jsonify(Documents=documents)
  # Returns document, sentence, sentence_word, triple, predicate, actions, user

@app.route("/api/document/<documentId>", methods=['GET'])
def fetchDocument(documentId): 
  #documentId = request.args['documentId']
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
def fetchUser(): 
  # Saves user
  email = request.form['email']
  password = request.form['password']

  if not email:
    return jsonify({"msg": "Missing email parameter"}), 400
  if not password:
    return jsonify({"msg": "Missing password parameter"}), 400

  accessToken = findOrCreateUser(email, password)

  if not accessToken: 
    return jsonify({"msg": "Bad username or password"}), 401
  else: 
    return jsonify(accessToken=accessToken,email=email), 200

#@app.route("/api/save-extraction", methods=['POST'])
#def saveExtraction(): 
  # Save extraction with document ID and user ID  

if __name__ == '__main__': 
  app.run(debug=True)