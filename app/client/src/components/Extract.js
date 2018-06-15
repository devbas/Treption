import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../containers/Header'
import CreateTournament from '../containers/CreateTournament'
import ValidationItem from '../containers/ValidationItem'
import ExtractedTripleItem from '../containers/ExtractedTripleItem'
import { bounce } from 'react-animations'

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
  playerType, 
  onRandomizeClick, 
  extractedTriples, 
  remainingTime, 
  backgroundColorLight, 
  backgroundColorMedium, 
  hasStartedValidating, 
  onValidatingStartClick, 
  hoverBoxStyle, 
  hasStartedExtracting, 
  onExtractingStartClick, 
  extractionContainsConcept, 
  onCorrectValidationAnswer, 
  gameOver, 
  onNewGameStartClick, 
  selectedAttribute 
}) => (
  <div className="extract" style={{ backgroundColor: backgroundColorLight }}> 
    {(tournamentCreated || !tournament) &&
      <CreateTournament color={color}/>
    }

    {tournament && !tournamentCreated && !isSentenceLoading &&
      <div className="extract-box">
    
        <div className="editor-box">
          <div className="inner-box">
            <div className="game-object-box">
              {/* {isValidating() &&
                <div className="progress left">{currentTripleOffset} of {totalTriples}</div>
              }
              
              {isExtracting() &&
                <div className="progress left">0 extracted</div>
              } */}

              {/* {isExtracting() &&
                <div className="time-remaining left"></div>
              } */}

              <div className="player-box">
                <div className="points right pulse animated">{playerType === 'competitor' ? tournament.competitor_points ? tournament.competitor_points : 0 : tournament.challenger_points ? tournament.challenger_points : 0 }</div>
                <div className="point-icon right"></div>
                <div className="player-name">{playerType === 'competitor' ? tournament.competitor_name : tournament.challenger_name }</div>
              </div>

              <div className="competitor-box">
                <div className="points left pulse animated">{playerType === 'competitor' ? tournament.challenger_points ? tournament.challenger_points : 0 : tournament.competitor_points ? tournament.competitor_points : 0 }</div>
                <div className="point-icon left"></div>
                <div className="competitor-name">{playerType === 'competitor' ? tournament.challenger_name : tournament.competitor_name }</div>
              </div>
      
              
              {/* <div className="competitor-tooltip-box"></div> */}
            </div>
            {isValidating() &&
              <div className="time-remaining">00:{remainingTime}</div>
            }
            
            <div className="sentence-box extract-word-box" style={{ backgroundColor: color }}>
              <div className="content">
                {selectedAttribute === 'subject' &&
                  <div className="help-title">Select an subject to start</div>
                }

                {selectedAttribute === 'predicate' &&
                  <div className="help-title">Select the relation</div>
                }

                {selectedAttribute === 'object' &&
                  <div className="help-title">Select a subject the object relates with</div>
                }

                {sentence.aggregatedWords &&
                  <div className="word-box">
                    {sentence.aggregatedWords.map(renderWord)}
                  </div>
                }
              </div>
            </div>

            <div className="content" style={{backgroundColor: backgroundColorMedium}}>
              {isValidating() &&
                <div className="validation-box">
                  <div className="divider"></div>
                  <ValidationItem onCorrectValidationAnswer={onCorrectValidationAnswer}/>
                  {!hasStartedValidating &&
                    <div className={hoverBoxStyle}>
                      <div className="explanation-box" style={{backgroundColor: color}}>
                        <div className="description">Agree or disagree on the presented relation relative to the sentence above.</div>
                      </div>
                      <div className="primary-action" onClick={onValidatingStartClick}>Start</div>
                    </div>
                  }

                  {gameOver &&
                    <div className={hoverBoxStyle}>
                      <div className="explanation-box" style={{backgroundColor: color}}>
                        <div className="description">Time is up!</div>
                      </div>
                      <div className="primary-action" onClick={onNewGameStartClick}>Play again</div>
                    </div>
                  }
                </div>
              }
              
              {isExtracting() &&
                <div className="extract-box" style={{height: 'auto'}}>
                  <div className="feeling-lucky-box">
                    <div className="feeling-lucky-button" onClick={onRandomizeClick}>Randomize</div>
                  </div>

                  {!extractionContainsConcept &&
                    <ExtractedTripleItem concept={true}/>  
                  }     

                  {extractedTriples.length > 0 && (extractedTriples[0].subject || extractedTriples[0].predicate || extractedTriples[0].object) &&
                    <span className="finished-triple-box">
                      {extractedTriples.map((triple) => {
                        return <ExtractedTripleItem triple={triple} concept={triple.concept}/>
                      })}
                    </span>
                  }             

                  {/* {!hasStartedExtracting &&
                    <div className={hoverBoxStyle}>
                      <div className="explanation-box" style={{backgroundColor: color}}>
                        <div className="description">Now create your own relations. Need inspiration? Try the random button!</div>
                      </div>
                      <div className="primary-action" onClick={onExtractingStartClick}>Start</div>
                    </div>
                  } */}
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