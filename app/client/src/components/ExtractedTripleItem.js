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
  <span>
    {!concept &&
      <span className="extracted-triples-saved-box">
        <div className="triple-box">
          <div className={`subject ${selectedAttribute === 'subject' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('subject')}>
            <ExtractedTripleElement data={subject} attribute='subject' concept={concept}/>
          </div>
          <div className={`predicate ${selectedAttribute === 'predicate' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
            <ExtractedTripleElement data={predicate} attribute='predicate' concept={concept}/>
          </div>
          <div className={`object ${selectedAttribute === 'object' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('object')}>
            <ExtractedTripleElement data={object} attribute='object' concept={concept}/>
          </div>
        </div>
      </span>
    }

    {concept &&
      <div className="triple-box">
        <div className={`subject ${selectedAttribute === 'subject' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('subject')}>
          {selectedAttribute === 'subject' &&
            <div className="help-title">Select a subject to start</div>
          }  
          <ExtractedTripleElement data={subject} attribute='subject' concept={concept}/>
        </div>
        <div className={`predicate ${selectedAttribute === 'predicate' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
          {selectedAttribute === 'predicate' &&
            <div className="help-title">Select the relation</div>
          }
          <ExtractedTripleElement data={predicate} attribute='predicate' concept={concept}/>
        </div>
        <div className={`object ${selectedAttribute === 'object' && concept ? 'active' : ''}`} onClick={() => onTripleAttributeSelect('object')}>
          {selectedAttribute === 'object' &&
            <div className="help-title">Select the subject</div>
          }
          <ExtractedTripleElement data={object} attribute='object' concept={concept}/>
        </div>
        <div className="submit-box">
          <div className="done" onClick={onTripleSubmit}></div>
        </div>
      </div>
    }
  </span>
)

export default ExtractedTripleItem