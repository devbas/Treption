import React from 'react';
import { Link } from 'react-router-dom'

const SentenceItem = ({ title, sentenceId, documentId, sentenceValue }) => (
  <div>
    <Link to={`/extract/${documentId}/${sentenceId}`}>{sentenceValue}..</Link>
  </div>
)

export default SentenceItem;