import React from 'react';
import Dropzone from 'react-dropzone'

const DocumentOverview = ({ documents, onFileDrop }) => (
  <div className="document-box">
    {!documents &&
      <div>
        No documents found! Upload first document: 
        <Dropzone onDrop={onFileDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    }
    
    {documents &&
      <div>Documents found</div>
    }
  </div>
)

export default DocumentOverview;