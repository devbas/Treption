import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../containers/Header'
import CreateTournament from '../containers/CreateTournament'

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
  tournament, 
  tournamentCreated
}) => (
  <div className="extract" style={{backgroundColor: color}}> 
    <Header scope="extract" documentId={documentId}/>
    {(tournamentCreated || !tournament) &&
      <CreateTournament color={color}/>
    }

    {tournament && !tournamentCreated &&
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
            {sentence.nextSentence &&
              <Link to={`/extract/${documentId}/${sentence.nextSentence}`}><div className="done"></div></Link>
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
  
    }
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