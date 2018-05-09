import React from 'react';
//import Dropzone from 'react-dropzone'
import Header from '../containers/Header'

const DocumentOverview = ({ 
  documents,  
  onDocumentTextChange, 
  onDocumentTextSubmit, 
  documentText, 
  renderDocumentView
}) => (
  <div>
    <Header/>
    <div className="document-box">
      {documents.length === 0 &&
        <div>
          No documents found! Upload first document: 
          <textarea value={documentText} onChange={onDocumentTextChange}/>
          <input type="submit" value="Upload" onClick={onDocumentTextSubmit}/>
        </div>
      }
      
      {(documents.length > 0) &&
        <div>
          <div className="superhero">
          </div>
          <div className="items">
            {documents.map(renderDocumentView)}
          </div>
        </div>
      }
    </div>
  </div>
)
//{documents.map(renderDocumentView)}

export default DocumentOverview;