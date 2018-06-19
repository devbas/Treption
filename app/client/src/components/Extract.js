import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../containers/Header'
import ValidationItem from '../containers/ValidationItem'
import ExtractedTripleItem from '../containers/ExtractedTripleItem'
import { bounce } from 'react-animations'

const Extract = ({ 
  sentence, 
  renderWord, 
  renderTriple, 
  color, 
  documentId, 
  isValidating, 
  isExtracting, 
  isSentenceLoading, 
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
  selectedAttribute, 
  player
}) => (
  <div className="extract" style={{ backgroundColor: backgroundColorLight }}> 

    {!isSentenceLoading &&
      <div className="extract-box">
        <div className="leaderboard-box">
          <div className="username-box">
            <div className="username">{player.email}</div>
          </div>
          <div className="accuracy-box">
            <div className="inner-box">
              <div className="label">Accuracy</div>
              <div className="progress-box">
                <div class="bar">
                  <div className="inner-fill" style={{width: `${parseInt(player.accuracy)}%`, 'background-color': color }}></div>
                </div>
                <div className="description">{player.accuracy}%</div>
              </div>
            </div>
          </div>
          <div className="position-box">
            <div className="inner-box">
              <div className="label">Position</div>
              <div className="ranking-box">
                <span className="ranking">{player.ranking}</span><span className="relative-ranking"> / {player.total_players}</span>
                <div className="ranking-icon"></div>
              </div>
            </div>
          </div>
          <div className="points-box">
            <div className="inner-box">
              <div className="label">Points</div>
              <div className="content-box">
                <div className="points">{player.points}</div>
                <div className="points-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="editor-box">
          <div className="inner-box">
            {isValidating() &&
              <div className="time-remaining">00:{remainingTime}</div>
            }
            
            <div className="sentence-box extract-word-box" style={{ backgroundColor: color }}>
              <div className="content">
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

export default Extract;