import React from 'react'
import { Link } from 'react-router-dom'
import ValidationItem from '../containers/ValidationItem'
import ExtractedTripleItem from '../containers/ExtractedTripleItem'

const Extract = ({ 
  sentence, 
  renderWord, 
  color, 
  documentId, 
  isValidating, 
  isExtracting, 
  isSentenceLoading, 
  extractedTriples, 
  remainingTime, 
  backgroundColorLight, 
  backgroundColorMedium, 
  hoverBoxStyle, 
  extractionContainsConcept, 
  onCorrectValidationAnswer, 
  gameOver, 
  onNewGameStartClick, 
  selectedAttribute, 
  player, 
  extractionFeedbackBoxStatus, 
  isPointBoxActive, 
  timerActive
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
                <div className="bar">
                  <div className="inner-fill" style={{width: `${parseInt(player.accuracy)}%`, 'backgroundColor': color }}></div>
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
            {isValidating() && timerActive && 
              <div className="time-remaining animated pulseToggle">00:{remainingTime}</div>
            }

            {isExtracting() &&
              <div className="question-box" style={{backgroundColor: backgroundColorMedium}}>
                <p>Click a word to create a new relation.</p>
              </div>
            }
            
            <div className={`sentence-box extract-word-box ${isValidating() ? 'is-validating' : ''}`} style={{ backgroundColor: backgroundColorMedium }}>
              <div className={`content ${isValidating() ? 'is-validating' : 'is-extracting'} attr-${selectedAttribute}`}>
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
                <div className="extract-box">

                  {!extractionContainsConcept &&
                    <ExtractedTripleItem concept={true} color={color}/>  
                  }     

                
                  <span className="finished-triple-box">
                    {extractedTriples.map((triple) => {
                      return <ExtractedTripleItem triple={triple} concept={triple.concept} color={color}/>
                    })}
                  </span>

                  {extractionFeedbackBoxStatus !== 0 &&
                    <div className="validation-conclusion-box">
                      <div className={`label ${isPointBoxActive ? 'animated bounceIn' : 'animated bounceOut' } ${extractionFeedbackBoxStatus === 200 ? 'correct' : 'incorrect' }`}>{extractionFeedbackBoxStatus === 200 ? '+5' : '0'}</div>
                    </div>
                  }
                </div>
              }
            </div>
            
          </div>
        </div>
        
        {isExtracting() &&
          <div className="sentence-control-box">
            <div className="inner-box">
              {sentence.nextSentence && isExtracting() &&
                <Link to={`/extract/${documentId}/${sentence.nextSentence}`} className="next">Next sentence ></Link>
              }
            </div>
          </div>
        }

      </div>
  
    }
  </div>
)

export default Extract;