from flask import Flask, request
from utils import POSTagger
from pprint import pprint
import pymysql.cursors

connection = pymysql.connect(host='db',user='root',password='root',db='treption')

try:
  with connection.cursor() as cursor:
    sql = "INSERT INTO `predicate` (`value`) VALUES (%s)"
    cursor.execute(sql, ('part of'))

  connection.commit()

finally:
  connection.close()


app = Flask(__name__)

app.logger.info('it is really us')

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

@app.route("/api/upload", methods=['POST'])
def uploadFile():
  if request.method == 'POST':  
    #if 'file' not in request.files:
    #  return "No file found"

    #uploadedFile = request.files['file']

    pos = POSTagger('bla')
    #print("Type of file: ", type(pos))
    return pos[0]
    #app.logger.info(myFile.read())

    #return "Excellent! Thank You"

    # Extract data from text

    # Pass it through POS Tagger

    # Save in database

@app.route("/api/document", methods=['GET'])
def getDocument(): 
  # Returns document, sentence, sentence_word, triple, predicate, actions, user
  return 1

@app.route("/api/triple", methods=['POST'])
def saveTriple(): 
  # Saves triple, action, (predicate)
  return 1

@app.route("/api/user", methods=['POST'])
def saveUser(): 
  # Saves user
  return 1

#@app.route("/api/save-extraction", methods=['POST'])
#def saveExtraction(): 
  # Save extraction with document ID and user ID  

if __name__ == '__main__': 
  app.run(debug=True)