import React from 'react';

const ValidationItem = ({ 
  isSentenceLoading,
  onChoiceClick, 
  hasClicked,
  answer, 
  clickedChoice, 
  triple, 
  isPointBoxActive, 
  isFeedbackBoxActive
}) => (
    <span>
      <div className="triple-item-box">
        {isSentenceLoading &&
          <div>Loading</div>
        }

        {!isSentenceLoading &&
          <span>
            <p>Do you think</p>
            <div className="triple-item-content-box">
              <div className="left subject">{triple.subject}</div>
              <div className="left predicate">{triple.predicate} </div>
              <div className="left object">{triple.object}</div>
            </div>
            <p>is a correct statement for the above sentence?</p>
            
            <div className="button-box">
              <div onClick={() => onChoiceClick('agree')} className="secondary-action agree"></div> 
              <div onClick={() => onChoiceClick('disagree')} className="secondary-action disagree"></div>
            </div>

          </span>
        }
      </div>
      {isFeedbackBoxActive &&
        <div className="validation-conclusion-box">
          <div className={`label ${isPointBoxActive ? 'animated bounceIn' : 'animated bounceOut'} ${answer === clickedChoice ? 'correct' : 'incorrect' }`}>{answer === clickedChoice ? '+1' : '0'}</div>
        </div>
      } 
    </span>
)

export default ValidationItem