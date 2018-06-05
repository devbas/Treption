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
  extractionContainsConcept
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
              {isValidating() &&
                <div className="progress left">{currentTripleOffset} of {totalTriples}</div>
              }
              
              {isExtracting() &&
                <div className="progress left">0 extracted</div>
              }

              {isValidating() &&
                <div className="time-remaining left">00:{remainingTime}</div>
              }

              {isExtracting() &&
                <div className="time-remaining left"></div>
              }
      
              <div className="points left pulse animated">{playerType === 'competitor' ? tournament.competitor_points : tournament.challenger_points } points</div>
              <div className="competitor-tooltip-box"></div>
            </div>
            
            <div className="sentence-box extract-word-box" style={{backgroundColor: backgroundColorMedium}}>
              <div className="content">
                {sentence.aggregatedWords &&
                  <div className="word-box">
                    {sentence.aggregatedWords.map(renderWord)}
                  </div>
                }
              </div>
            </div>

            <div className="content" style={{ backgroundColor: color }}>
              {isValidating() &&
                <div className="validation-box">
                  <div className="divider"></div>
                  <ValidationItem/>
                  {!hasStartedValidating &&
                    <div className={hoverBoxStyle}>
                      <div className="explanation-box" style={{backgroundColor: color}}>
                        <div className="description">Agree or disagree on the presented relation relative to the sentence above.</div>
                      </div>
                      <div className="primary-action" onClick={onValidatingStartClick}>Start</div>
                    </div>
                  }
                </div>
              }
              
              {isExtracting() &&
                <div className="extract-box">
                  <div className="feeling-lucky-box">
                    <div className="feeling-lucky-button" onClick={onRandomizeClick}>Randomize</div>
                  </div>
                  {extractedTriples.length > 0 && (extractedTriples[0].subject || extractedTriples[0].predicate || extractedTriples[0].object) &&
                    <span>
                      {extractedTriples.map((triple) => {
                        return <ExtractedTripleItem triple={triple}/>
                      })}
                    </span>
                  }

                  {!extractionContainsConcept &&
                    <ExtractedTripleItem concept={true}/>  
                  }                  

                  {!hasStartedExtracting &&
                    <div className={hoverBoxStyle}>
                      <div className="explanation-box" style={{backgroundColor: color}}>
                        <div className="description">Now create your own relations. Need inspiration? Try the random button!</div>
                      </div>
                      <div className="primary-action" onClick={onExtractingStartClick}>Start</div>
                    </div>
                  }
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