import React from 'react';
import { Link } from 'react-router-dom'

const DocumentItem = ({ title, id, backgroundColor }) => (
  <div className="document-item">
    <div className="inner-box" style={{backgroundColor: backgroundColor}}>
      <Link to={'/document/' + id} className="title">The head of Kyrgyzstan's civil aviation authority said that out of 90 passengers… </Link>
      <div className="action-box">
        <button className="action">Continue</button>
        <div className="more-info"></div>
      </div>
    </div>
  </div>
)

export default DocumentItem;