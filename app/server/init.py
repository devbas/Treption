from flask import Flask 

app = Flask(__name__)

@app.route("/")
def hello(): 
  return "Be Amazed"

ALLOWED_EXTENSIONS = set(['txt'])

@app.route("/upload", methods=['GET'])
def serveUploadForm(): 
  return '''
    <!doctype html>
    <title>Upload new Text</title>
    <h1>Upload new Text (txt)</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

@app.route("/api/upload", methods=['POST'])
def uploadFile():
  if request.method == 'POST':  
    if 'file' not in request.files:
      flash('No file part')

    # Extract data from text

    # Pass it through POS Tagger

    # Save in database

#@app.route("/api/save-extraction", methods=['POST'])
#def saveExtraction(): 
  # Save extraction with document ID and user ID  

if __name__ == '__main__': 
  app.run(debug=True)