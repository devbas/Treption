import React from 'react';
import { Link } from 'react-router-dom'

const DocumentItem = ({ title, id, backgroundColor }) => (
  <div className="document-item">
    <div className="inner-box" style={{backgroundColor: backgroundColor}}>
      <div className="content">
        <Link to={'/document/' + id} className="title">{title}</Link>
        <div className="action-box">
          <Link to={`/extract/${id}/1`}><button className="action">Continue</button></Link>
          <Link to={`/document/${id}`}><div className="more-info"></div></Link>
        </div>
      </div>
    </div>
  </div>
)

export default DocumentItem;