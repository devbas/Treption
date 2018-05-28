import React from 'react'

const ExtractedTripleItem = ({ subject, predicate, object, concept }) => (
  <div className="triple-box">
    <div className="subject">{subject}</div>
    <div className="predicate">{predicate}</div>
    <div className="object">{object}</div>

    {concept &&
      <div className="done"></div>
    }
  </div>
)

export default ExtractedTripleItem