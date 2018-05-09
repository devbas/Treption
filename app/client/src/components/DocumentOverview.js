import React from 'react';
import Dropzone from 'react-dropzone'
import Header from '../containers/Header'

const DocumentOverview = ({ 
  documents,  
  onDocumentTextChange, 
  onDocumentTextSubmit, 
  documentText, 
  renderDocumentView, 
  onDrop, 
  dropzoneActive, 
  files, 
  accept
}) => (
  <div>
    <Header/>
    <div className="document-box">
      {documents.length === 0 &&
        <div className="superhero">
          <div className="inner-box">
            <div className="title">Upload your first document<br/>to get started:</div>
            <Dropzone 
              className="dropzone"
              onDrop={onDrop}
              accept={accept}
            >
              {dropzoneActive && 
                <div className="landing-box">
                  <div className="landing-label">Drop files...</div>
                </div> 
              }
              
              {files && 
                <div className="loading-box">
                  <div className="loader-label">Processing..</div>
                  <div className="loader"></div>
                </div>
              }
            </Dropzone>
          </div>
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