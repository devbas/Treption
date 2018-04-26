import React from 'react';

const DocumentOverview = ({ documents }) => (
  <div className="document-box">
    {!documents &&
      <div>No documents found! Upload first document: </div>
    }
    
    {documents &&
      <div>Documents found</div>
    }
  </div>
)

export default DocumentOverview;