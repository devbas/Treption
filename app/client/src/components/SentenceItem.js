import React from 'react';
import { Link } from 'react-router-dom'

const SentenceItem = ({ title, sentenceId, documentId, sentenceValue, color }) => (
  <div className="sentence-item" style={{backgroundColor: color}}>
    <div className="inner-box">
      <Link to={`/extract/${documentId}/${sentenceId}`}>{sentenceValue}..</Link>
    </div>
  </div>
)

export default SentenceItem;