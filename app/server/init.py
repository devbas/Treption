from flask import Flask, request
from utils import POSTagger, createDocument
from pprint import pprint

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
    #uploadedFile.close()


    #return "We hear you!"

    

    #pos = POSTagger('bla')
    #print("Type of file: ", type(pos))
    #return pos[0]
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