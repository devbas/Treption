import React from 'react';

const TripleItem = ({ 
  subject, 
  predicate, 
  object, 
  onChoiceClick, 
  isActive, 
  hasClicked,
  onNextQuestionClick, 
  answer, 
  clickedChoice
}) => (
  <div className="triple-item-box">

    <div className="points-to-earn-box">
      +1 
    </div>

    <div className="triple-item-content-box">
      <div className="left subject">{subject}</div>
      <div className="left predicate">{predicate} </div>
      <div className="left object">{object}</div>
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