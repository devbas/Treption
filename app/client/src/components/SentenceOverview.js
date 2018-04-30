import React from 'react';

const SentenceOverview = ({ document, renderSentence }) => (
  <div className="document-box">
    <div>Hello Sentence Overview</div>
    {document.sentences &&
      <div>
        {document.sentences.map(renderSentence)}
      </div>
    }
  </div>
)
//{activeDocument.sentences.map(renderSentence)}

export default SentenceOverview;