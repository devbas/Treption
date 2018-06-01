from flask import Flask, request, jsonify
from utils import (
  createDocument, 
  getDocuments, 
  getDocument, 
  getSentence, 
  createPredicate, 
  getPredicates, 
  findOrCreateUser, 
  getTriples, 
  createUserAction, 
  getLastEditedDocument, 
  createTripleVote, 
  getTriples, 
  getCurrentTournament, 
  createTournament, 
  searchOpenTournament, 
  fetchTournamentStatus, 
  setTournamentCompetitor, 
  createTriple
)
#from rdf import createTriple
from pprint import pprint
import sys
from flask_jwt_extended import (
  jwt_required, 
  jwt_refresh_token_required,
  JWTManager, 
  get_jwt_identity, 
  create_access_token
)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['JWT_TOKEN_LOCATION'] = 'headers'
#app.config['JWT_ACCESS_COOKIE_NAME'] = 'accessToken'
#app.config['JWT_REFRESH_COOKIE_NAME'] = 'refreshToken'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/refresh'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False 
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = False 
jwt = JWTManager(app)

#@jwt.user_identity_loader
#def user_identity_lookup(user):
  #print('user: ' + user, file=sys.stderr)
#  return user.id

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
@jwt_required
def fetchDocuments(): 

  user = get_jwt_identity()
  userId = user['id']
  print('current user: ' + str(userId) , file=sys.stderr)

  documents = getDocuments(userId)
  lastEditedDocument = getLastEditedDocument(userId)
  return jsonify(Documents=documents,LastEditedDocumentId=lastEditedDocument)
  # Returns document, sentence, sentence_word, triple, predicate, actions, user

@app.route("/api/document/<documentId>", methods=['GET'])
@jwt_required
def fetchDocument(documentId): 

  user = get_jwt_identity()
  userId = user['id']

  document = getDocument(documentId, userId)
  return jsonify(Document=document)

@app.route("/api/sentence/<documentId>/<sentenceId>", methods=['GET'])
@jwt_required
def fetchSentence(documentId, sentenceId): 

  user = get_jwt_identity()
  userId = user['id']

  sentence = getSentence(documentId, sentenceId)
  triples = getTriples(sentenceId)
  document = getDocument(documentId, userId)
  return jsonify(Sentence=sentence,Triples=triples,Document=document)

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

#@app.route("/api/triple", methods=['POST'])
#def saveTriple(): 
  # Saves triple, action, (predicate)
#  subject = request.form['subject']
#  predicate = request.form['predicate']
#  objectValue = request.form['object']

#  triple = createTriple(subject, predicate, objectValue)
#  return 'done' 

@app.route("/api/user", methods=['POST'])
def fetchUser(): 
  # Saves user
  print('user info: ' + str(request.form['password']), file=sys.stderr)
  email = request.form['email']
  password = request.form['password']

  if not email:
    return jsonify({"msg": "Missing email parameter"}), 400
  if not password:
    return jsonify({"msg": "Missing password parameter"}), 400

  tokens = findOrCreateUser(email, password)

  

  if not tokens: 
    return jsonify({"msg": "Bad username or password"}), 401
  else: 
    return jsonify(accessToken=tokens['access_token'],refreshToken=tokens['refresh_token'],email=email), 200

@app.route("/api/user-action", methods=['POST'])
@jwt_required
def saveUserAction(): 
  actionKey = request.form['actionKey']
  value = request.form['value']
  user = get_jwt_identity()
  userId = user['id']

  if not actionKey or not value: 
    return jsonify({ 'msg': 'Missing parameters' }), 400
  
  createUserAction(actionKey, value, userId)
  return jsonify({ 'msg': 'OK' }), 200

@app.route("/api/triple/vote", methods=['POST'])
@jwt_required
def saveTripleVote(): 
  user = get_jwt_identity()
  userId = user['id']
  tripleId = request.form['tripleId']
  choice = request.form['choice']

  if not tripleId or not choice: 
    return jsonify({ 'msg': 'Missing parameters' }), 400

  currentTournament = getCurrentTournament(userId)

  if currentTournament['challenger_id'] == userId: 
    playerType = 'challenger'
  
  if currentTournament['competitor_id'] == userId: 
    playerType = 'competitor'


  print(' Current tournament: ' + str(currentTournament), file=sys.stderr)
  createTripleVote(userId, tripleId, choice, currentTournament['tournament_id'], playerType)

  updatedTournament = getCurrentTournament(userId)
  return jsonify({ 'Tournament': updatedTournament }), 200


@app.route("/api/refresh", methods=['POST'])
@jwt_refresh_token_required
def refresh(): 
  current_user = get_jwt_identity() 
  print(' Current refresh: ' + str(current_user), file=sys.stderr)
  ret = {
    'access_token': create_access_token(identity=current_user)
  }
  return jsonify(ret), 200

@app.route("/api/export/<documentId>", methods=['GET'])
def exportDocument(): 
  triples = getTriples(documentId)
  return 1

@app.route("/api/current-tournament", methods=['GET'])
@jwt_required 
def fetchTournament(): 
  user = get_jwt_identity() 
  userId = user['id']

  tournament = getCurrentTournament(userId)

  return jsonify(Tournament=tournament), 200

@app.route("/api/create-tournament", methods=['GET'])
@jwt_required
def addTournament():  
  user = get_jwt_identity() 
  userId = user['id']

  tournament = createTournament(userId)

  return jsonify(Tournament=tournament), 200

@app.route("/api/join-tournament", methods=['GET'])
@jwt_required
def joinTournament(): 
  user = get_jwt_identity() 
  userId = user['id']

  tournament = searchOpenTournament(userId) 

  return jsonify(Tournament=tournament), 200

@app.route("/api/status-tournament/<tournamentHash>", methods=['GET'])
def setTournamentStatus(tournamentHash): 

  tournamentStatus = fetchTournamentStatus(tournamentHash)

  return jsonify(TournamentStatus=tournamentStatus), 200

@app.route("/api/update-tournament/<tournamentHash>", methods=['POST'])
@jwt_required 
def updateTournamentCompetitor(tournamentHash): 
  user = get_jwt_identity() 
  userId = user['id']

  tournament = setTournamentCompetitor(tournamentHash, userId)

  print('tournament: ' + tournament, file=sys.stderr)
  return jsonify(tournament), 200

@app.route("/api/triple/add", methods=['POST'])
@jwt_required 
def addTriple(): 
  user = get_jwt_identity() 
  userId = user['id']

  tripleSubject = request.form['subject']
  triplePredicate = request.form['predicate']
  tripleObject = request.form['object']
  sentenceId = request.form['sentenceId']
  currentTournament = getCurrentTournament(userId)

  if currentTournament['challenger_id'] == userId: 
    playerType = 'challenger'
  
  if currentTournament['competitor_id'] == userId: 
    playerType = 'competitor'

  if tripleSubject and triplePredicate and tripleObject and sentenceId:
    triple = createTriple(tripleSubject, triplePredicate, tripleObject, sentenceId, userId, currentTournament['tournament_id'], playerType)
    
    currentTournament = getCurrentTournament(userId)
    if triple: 
      return jsonify({ 'Triple': triple, 'Tournament': currentTournament }), 200
    else: 
      return jsonify({ 'msg': 'Relation already exists' }), 400

  else: 
    return jsonify({ 'msg': 'Missing parameters' }), 400

  

if __name__ == '__main__': 
  app.run(debug=True)