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
  currentTripleOffset, 
  playerType
}) => (
  <div className="extract" style={{backgroundColor: color}}> 
    <Header scope="extract" documentId={documentId}/>
    {(tournamentCreated || !tournament) &&
      <CreateTournament color={color}/>
    }

    {tournament && !tournamentCreated && !isSentenceLoading &&
      <div className="extract-box">
        
        {isValidating() &&
          <div className={`sentence-box ${isValidating() ? 'is-validating' : 'is-extracting'}`}>
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
        }


        <div className={`editor-box ${isExtracting() ? 'is-extracting' : 'is-validating'}`}>
          <div className="inner-box" style={{backgroundColor: color}}>
            <div className="game-object-box">
              {isValidating() &&
                <div className="progress left">{currentTripleOffset} of {totalTriples}</div>
              }
              
              {isExtracting() &&
                <div className="progress left">0 extracted</div>
              }
              <div className="time-remaining left">00:15</div>
              <div className="points left">{playerType === 'competitor' ? tournament.competitor_points : tournament.challenger_points } points</div>
            </div>
            <div className="explanation-box">
              {isValidating() &&
                <div className="description">Agree or disagree on the presented relation relative to the sentence above.</div>
              }

              {isExtracting() &&
                <div className="description">Now try to create your own relations. No inspiration? Try the random button!</div>
              }
            </div>
            
            {isExtracting() &&
              <div className="sentence-box extract-word-box">
                <div className="content">
                  {sentence.aggregatedWords &&
                    <div className="word-box">
                      {sentence.aggregatedWords.map(renderWord)}
                    </div>
                  }
                </div>
              </div>
            }

            <div className="content">
              {isValidating() &&
                <div className="validation-box">
                  <TripleItem/>
                </div>
              }
              
              {isExtracting() &&
                <div className="extract-box">
                  <div className="feeling-lucky-box">
                    <div className="feeling-lucky-button">Randomize</div>
                  </div>

                  <div className="triple-box">
                    <div className="subject"></div>
                    <div className="predicate"></div>
                    <div className="object"></div>
                  </div>
                  <div className="done"></div>
                </div>
              }
            </div>
            
          </div>
        </div>

        <div className="sentence-control-box">
          <div className="inner-box">
            {sentence.nextSentence && isExtracting() &&
              <Link to={`/extract/${documentId}/${sentence.nextSentence}`} className="next">Next sentence ></Link>
            }
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