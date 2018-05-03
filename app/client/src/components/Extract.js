import React from 'react'
import TripleLanding from '../containers/TripleLanding'

const Extract = ({ 
  sentence, 
  renderWord, 
  predicates, 
  onPredicateAdd, 
  onPredicateInputChange,
  predicateInput, 
  renderPredicate, 
}) => (
  <div className="extract">
    <div className="extract-box">

      <div className="sentence-box">
        <div className="inner-box">
          {sentence.aggregatedWords &&
            <div className="word-box">
              {sentence.aggregatedWords.map(renderWord)}
            </div>
          }
        </div>
      </div>

      <TripleLanding/>
      
      <div className="predicate-box">
        <div className="inner-box">
          {predicates &&
            <div>
              {predicates.map(renderPredicate)}
            </div>
          }
          <input type="text" name="predicate" value={predicateInput} onChange={onPredicateInputChange}/>
          <input type="submit" name="submit" value="Add predicate" onClick={onPredicateAdd}/>
        </div>
      </div>

    </div>
  </div>
)

export default Extract;