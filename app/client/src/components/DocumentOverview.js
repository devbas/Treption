import React from 'react';
//import Dropzone from 'react-dropzone'

const DocumentOverview = ({ 
  documents,  
  onDocumentTextChange, 
  onDocumentTextSubmit, 
  documentText, 
  renderDocumentView 
}) => (
  <div className="document-box">
    {!documents &&
      <div>
        No documents found! Upload first document: 
        <textarea value={documentText} onChange={onDocumentTextChange}/>
        <input type="submit" value="Upload" onClick={onDocumentTextSubmit}/>
      </div>
    }
    
    {(documents.length > 0) &&
      <div>
        {documents.map(renderDocumentView)}
      </div>
    }
  </div>
)
//{documents.map(renderDocumentView)}

export default DocumentOverview;