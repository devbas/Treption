import React from 'react'

const ExtractedTripleItem = ({ 
  subject, 
  predicate, 
  object, 
  concept, 
  onTripleAttributeSelect, 
  selectedAttribute
}) => (
  <div className="triple-box">
    <div className={`subject ${selectedAttribute === 'subject' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('subject')}>{subject}</div>
    <div className={`predicate ${selectedAttribute === 'predicate' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>{predicate}</div>
    <div className={`object ${selectedAttribute === 'object' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('object')}>{object}</div>

    {concept &&
      <div className="done"></div>
    }
  </div>
)

export default ExtractedTripleItem