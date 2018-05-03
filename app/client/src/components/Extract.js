import React from 'react';

const Extract = ({ 
  sentence, 
  renderWord, 
  predicates, 
  onPredicateAdd, 
  onPredicateInputChange,
  predicateInput, 
  renderPredicate
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

      <div className="landing-box">
        <div className="inner-box">
          Landing
        </div>
      </div>

      <div className="predicate-box">
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
)

export default Extract;