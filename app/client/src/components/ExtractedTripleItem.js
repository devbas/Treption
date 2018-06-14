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
      <div className="submit-box" style={{display: 'none'}}>
        <div className="done" onClick={onTripleSubmit}></div>
      </div>
    }

    {/* {concept &&
      <span className="active-label-box">

        {selectedAttribute === 'subject' &&
          <div className="active-label subject"></div>  
        }

        {selectedAttribute === 'predicate' &&
          <div className="active-label predicate"></div>  
        }

        {selectedAttribute === 'object' &&
          <div className="active-label object"></div> 
        }

      </span>
    } */}
  </div>
)

export default ExtractedTripleItem