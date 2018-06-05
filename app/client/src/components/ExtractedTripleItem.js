import React from 'react'

import ExtractedTripleItemToken from '../containers/ExtractedTripleItemToken'

const ExtractedTripleItem = ({ 
  subject, 
  predicate, 
  object, 
  concept, 
  onTripleAttributeSelect, 
  selectedAttribute, 
  onTripleSubmit, 
  renderTripleItemToken
}) => (
  <div className="triple-box">
    <div className={`subject ${selectedAttribute === 'subject' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('subject')}>
      {subject.map((subjectTokens) => renderTripleItemToken(subjectTokens, 'subject', concept))}
      
      {/* <ExtractedTripleItemToken tokens={subject} attribute='subject'/> */}
      {/* {subject} */}
    </div>
    <div className={`predicate ${selectedAttribute === 'predicate' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
      {predicate.map((predicateTokens) => renderTripleItemToken(predicateTokens, 'predicate', concept))}
      
      {/* <ExtractedTripleItemToken attribute='predicate' tokens={predicate}/> */}
      {/* {predicate} */}
    </div>
    <div className={`object ${selectedAttribute === 'object' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('object')}>
      {object.map((objectTokens) => renderTripleItemToken(objectTokens, 'object', concept))}
      
      {/* <ExtractedTripleItemToken attribute='object' tokens={object}/> */}
      {/* {object} */}
    </div>

    {concept &&
      <div className="submit-box">
        <div className="done" onClick={onTripleSubmit}></div>
      </div>
    }
  </div>
)

export default ExtractedTripleItem