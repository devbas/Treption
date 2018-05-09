import React from 'react';
import Header from '../containers/Header'

const SentenceOverview = ({ document, renderSentence }) => (
  <div className="sentence-box">
    <Header/>
    {document.sentences &&
      <div className="items">
        {document.sentences.map(renderSentence)}
      </div>
    }
  </div>
)
//{activeDocument.sentences.map(renderSentence)}

export default SentenceOverview;