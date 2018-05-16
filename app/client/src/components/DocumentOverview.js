import React from 'react';
import Dropzone from 'react-dropzone'
import Header from '../containers/Header'
import { Link } from 'react-router-dom'

const DocumentOverview = ({ 
  documents,  
  featuredDocument,
  featuredDocumentTitle,
  featuredDocumentBackground,
  onDocumentTextChange, 
  onDocumentTextSubmit, 
  documentText, 
  renderDocumentView, 
  onDrop, 
  dropzoneActive, 
  files, 
  accept, 
  onHeroExtractClick
}) => (
  <div>
    <Header/>
    <div className="document-box">
      <div className="superhero" style={{backgroundColor: featuredDocumentBackground}}>
        {featuredDocument &&
          <div className="inner-box">
            <div className="title">{featuredDocumentTitle}..</div>
            <div className="progress-box">
              <div className="label">0 / {featuredDocument ? featuredDocument.sentenceCount : 0} sentences</div>
              <div className="bar"></div>
            </div>
            <div className="action-box">
              <Link to={`/extract/${featuredDocument.documentId}/1`} onClick={onHeroExtractClick}><button className="primary-action">Start</button></Link>
              <Link to={`/document/${featuredDocument.documentId}`}><button className="secondary-action">More info</button></Link>
            </div>
          </div>
        }

        {!featuredDocument &&
          <div className="inner-box"></div>
        }
      </div>
      
      <div className="dropzone-box">
        <Dropzone 
          className="dropzone"
          onDrop={onDrop}
          accept={accept}
        >
          {dropzoneActive && 
            <div className="landing-box">
              <div className="landing-label">Drop you're own file to extract...</div>
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

      {(documents.length > 0) &&
        <div>
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