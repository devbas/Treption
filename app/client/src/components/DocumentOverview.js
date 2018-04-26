import React from 'react';
//import Dropzone from 'react-dropzone'

const DocumentOverview = ({ 
  documents,  
  onDocumentTextChange, 
  onDocumentTextSubmit, 
  documentText 
}) => (
  <div className="document-box">
    {!documents &&
      <div>
        No documents found! Upload first document: 
        <textarea value={documentText} onChange={onDocumentTextChange}/>
        <input type="submit" value="Upload" onClick={onDocumentTextSubmit}/>
      </div>
    }
    
    {documents &&
      <div>Documents found</div>
    }
  </div>
)

export default DocumentOverview;