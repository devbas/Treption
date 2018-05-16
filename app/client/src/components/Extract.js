import React from 'react'
import { Link } from 'react-router-dom'

const Extract = ({ 
  sentence, 
  renderWord, 
  predicates, 
  onPredicateAdd, 
  onPredicateInputChange,
  predicateInput, 
  renderPredicate, 
  triples, 
  renderTriple, 
  color, 
  documentId,
  nextSentenceId, 
  prevSentenceId
}) => (
  <div className="extract" style={{backgroundColor: color}}>
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

      <div className="sentence-control-box">
        <div className="inner-box">
          {prevSentenceId &&
            <Link to={`/extract/${documentId}/${prevSentenceId}`}><div className="prev">Previous</div></Link>
          }
          {nextSentenceId &&
            <Link to={`/extract/${documentId}/${nextSentenceId}`}><div className="next">Next</div></Link>
          }
        </div>
      </div>

      <div className="editor-box">
        <div className="inner-box" style={{backgroundColor: color}}>
          <div className="content">
            {triples.map(renderTriple)}
          </div>
        </div>
      </div>

    </div>
  </div>
)
/**/


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