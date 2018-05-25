import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../containers/Header'
import CreateTournament from '../containers/CreateTournament'
import TripleItem from '../containers/TripleItem'

const Extract = ({ 
  sentence, 
  renderWord, 
  renderTriple, 
  color, 
  documentId, 
  tournament, 
  tournamentCreated, 
  isValidating, 
  isExtracting, 
  isSentenceLoading, 
  totalTriples,
  currentTripleOffset
}) => (
  <div className="extract" style={{backgroundColor: color}}> 
    <Header scope="extract" documentId={documentId}/>
    {(tournamentCreated || !tournament) &&
      <CreateTournament color={color}/>
    }

    {tournament && !tournamentCreated && !isSentenceLoading &&
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
            <div className="game-object-box">
              {isValidating() &&
                <div className="progress left">{currentTripleOffset} of {totalTriples}</div>
              }
              
              {isExtracting() &&
                <div className="progress left">0 extracted</div>
              }
              <div className="time-remaining left">00:15</div>
              <div className="points left">230</div>
            </div>
            <div className="content">
              {isValidating() &&
                <div className="validation-box">
                  <TripleItem/>
                </div>
              }
              
              {isExtracting() &&
                <div className="extract-box">
                  <div className="divider"></div>
                  <div className="description">Select one or multiple words:</div>
                  <div className="word-choice-box">Building | structure</div>
                  <div className="triple-box">
                    <div className="subject">Building</div>
                    <div className="predicate">consists of</div>
                    <div className="object">variable structure</div>
                  </div>
                </div>
              }
            </div>
            
          </div>
        </div>

      </div>
  
    }
  </div>
)

//{triples.map(renderTriple)}
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