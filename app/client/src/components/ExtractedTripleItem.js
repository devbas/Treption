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
  renderTripleItemToken, 
  submitVisible, 
  color, 
  extractionError
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
      <span className="concept-triple-box">
        {extractionError &&
          <div className="error-box">
            {extractionError}
          </div>
        }
        <div className="triple-box">
          <div className={`subject ${selectedAttribute === 'subject' && concept ? 'active' : ''} ${subject.length === 0 ? 'empty-state' : ''}`} onClick={() => onTripleAttributeSelect('subject')}>
            {selectedAttribute === 'subject' && subject.length === 0 &&
              <div className="help-title">Choose a subject</div>
            }  
            <ExtractedTripleElement data={subject} attribute='subject' concept={concept}/>
          </div>
          <div className={`relation-box`}>
            <div className="arrow"></div>
            <div className={`predicate ${selectedAttribute === 'predicate' && concept ? 'active' : ''} ${predicate.length === 0 ? 'empty-state' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
              {selectedAttribute === 'predicate' && predicate.length === 0 &&
                <div className="help-title">Choose the relation</div>
              }
              <ExtractedTripleElement data={predicate} attribute='predicate' concept={concept}/>
            </div>
          </div>
          {/* <div className={`predicate ${selectedAttribute === 'predicate' && concept ? 'active' : ''} ${predicate.length === 0 ? 'empty-state' : ''}`} onClick={() => onTripleAttributeSelect('predicate')}>
            {selectedAttribute === 'predicate' && predicate.length === 0 &&
              <div className="help-title">Choose the relation</div>
            }
            <ExtractedTripleElement data={predicate} attribute='predicate' concept={concept}/>
          </div> */}
          <div className={`object ${selectedAttribute === 'object' && concept ? 'active' : ''} ${object.length === 0 ? 'empty-state' : ''}`} onClick={() => onTripleAttributeSelect('object')}>
            {selectedAttribute === 'object' && object.length === 0 &&
              <div className="help-title">Choose an object</div>
            }
            <ExtractedTripleElement data={object} attribute='object' concept={concept}/>
          </div>
          {/* {submitVisible && */}
            <div className="submit-box animated pulse">
              <div className="done" onClick={onTripleSubmit}></div>
            </div>
          {/* } */}
        </div>
        <div className="example-box">
          <div className={`example example-subject ${selectedAttribute === 'subject' ? 'active' : ''}`}>
            e.g. Barack Obama
          </div>
          <div className={`example example-predicate ${selectedAttribute === 'predicate' ? 'active' : ''}`}>
            e.g. is born on
          </div>
          <div className={`example example-object ${selectedAttribute === 'object' ? 'active' : ''}`}>
            e.g. Hawaii
          </div>
        </div>
      </span>
    }
  </span>
)

export default ExtractedTripleItem