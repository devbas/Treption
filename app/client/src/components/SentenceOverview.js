import React from 'react';

const SentenceOverview = ({ document, renderSentence }) => (
  <div className="sentence-box">
    <div>Hello Sentence Overview</div>
    {document.sentences &&
      <div className="items">
        {document.sentences.map(renderSentence)}
      </div>
    }
  </div>
)
//{activeDocument.sentences.map(renderSentence)}

export default SentenceOverview;