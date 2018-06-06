import React from 'react'

// import ExtractedTripleItemToken from '../containers/ExtractedTripleItemToken'
import ExtractedTripleElement from '../containers/ExtractedTripleElement'

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
      <ExtractedTripleElement data={subject} attribute='subject' concept={concept}/>
    </div>
    <div className={`predicate ${selectedAttribute === 'predicate' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
      <ExtractedTripleElement data={predicate} attribute='predicate' concept={concept}/>
    </div>
    <div className={`object ${selectedAttribute === 'object' ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('object')}>
      <ExtractedTripleElement data={object} attribute='object' concept={concept}/>
    </div>

    {concept &&
      <div className="submit-box">
        <div className="done" onClick={onTripleSubmit}></div>
      </div>
    }
  </div>
)

export default ExtractedTripleItem