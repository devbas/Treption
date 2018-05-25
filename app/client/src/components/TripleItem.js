import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const TripleItem = ({ 
  isSentenceLoading,
  onChoiceClick, 
  isActive, 
  hasClicked,
  onNextQuestionClick, 
  answer, 
  clickedChoice, 
  triple
}) => (
  <TransitionGroup className="triple-item-box">
    <CSSTransition timeout={500} classNames="fade">
      <div className="triple-item-box">
        {isSentenceLoading &&
          <div>Loading</div>
        }

        {!isSentenceLoading &&
          <div>
            <div className="points-to-earn-box">
              +1 
            </div>

            <div className="triple-item-content-box">
              <div className="left subject">{triple.subject}</div>
              <div className="left predicate">{triple.predicate} </div>
              <div className="left object">{triple.object}</div>
            </div>
            
            {!hasClicked &&
              <div className="button-box">
                <div onClick={() => onChoiceClick('agree')} className="secondary-action">agree</div> 
                <div onClick={() => onChoiceClick('disagree')} className="secondary-action">disagree</div>
              </div>
            }
            
            {hasClicked &&
              <div>
                <div className="button-box">
                  <div className={`secondary-action ${answer === clickedChoice ? 'correct': 'incorrect'} ${clickedChoice === 'agree' ? 'chosen' : 'not-chosen animated pulse'}`}>agree</div> 
                  <div className={`secondary-action ${answer === clickedChoice ? 'correct': 'incorrect'} ${clickedChoice === 'disagree' ? 'chosen' : 'not-chosen animated pulse'}`}>disagree</div>
                </div>
                <div className="next-task" onClick={onNextQuestionClick}>Next</div>
              </div>
            }
          </div>
        }
      </div>
    </CSSTransition>
  </TransitionGroup>
)

/*
          {triple && triple.subject &&
        <div className="triple-subject">{triple.subject}</div>
      }

      {triple && triple.predicate &&
        <div className="triple-predicate">{triple.predicate}</div>
      }

      {triple.object &&
        <div className="triple-object">{triple.object}</div>
      }
*/

export default TripleItem