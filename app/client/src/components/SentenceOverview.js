import React from 'react';
import Header from '../containers/Header'
import { Link } from 'react-router-dom'

const SentenceOverview = ({ document, renderSentence, backgroundColor, onExportClick }) => (
  <div>
    <Header/>
    <div className="sentence-context-box">
      <div className="inner-box">
        <div className="left">
          <Link to={`/`}>Back to all documents</Link>
        </div>
        <div className="right">
          <button onClick={onExportClick}>Export to RDF</button>
        </div>
      </div>
    </div>
    <div className="superhero" style={{backgroundColor: backgroundColor}}>
      <div className="inner-box">
        <div className="title">Here we show the hand-off</div>
      </div>
    </div>
    <div className="sentence-box">
      {document.sentences &&
        <div>
          <div className="items">
            {document.sentences.map((sentence) => renderSentence(sentence, backgroundColor))}
          </div>
        </div>
      }
    </div>
  </div>
)
//{activeDocument.sentences.map(renderSentence)}

export default SentenceOverview;