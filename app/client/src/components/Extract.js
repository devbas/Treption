import React from 'react'
import TripleLanding from '../containers/TripleLanding'
import Header from '../containers/Header'

const Extract = ({ 
  sentence, 
  renderWord, 
  predicates, 
  onPredicateAdd, 
  onPredicateInputChange,
  predicateInput, 
  renderPredicate, 
  triples, 
  renderTriple
}) => (
  <div className="extract">
    <div className="extract-box">

      <div className="sentence-box">
        <div className="inner-box">
          <div className="content">
            {sentence.aggregatedWords &&
              <div className="word-box">
                {sentence.aggregatedWords.map(renderWord)}
              </div>
            }
          </div>
        </div>
      </div>

    </div>

    <div className="editor-box">
      <div className="inner-box">
        <div className="content">
          {triples.map(renderTriple)}
          <div className="triple-box">
            <div className="subject">Window</div>
            <div className="predicate">lights-up during</div>
            <div className="object">fire</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

//<TripleLanding/>

/* <div className="predicate-box">
        <div className="inner-box">
          {predicates &&
            <div>
              {predicates.map(renderPredicate)}
            </div>
          }
          <input type="text" name="predicate" value={predicateInput} onChange={onPredicateInputChange}/>
          <input type="submit" name="submit" value="Add predicate" onClick={onPredicateAdd}/>
        </div>
      </div>*/

export default Extract;