import React from 'react';

const TripleItem = ({ subject, predicate, object, onChoiceClick, isActive }) => (
  <div className="triple-item-box left">

    <div className="points-to-earn-box">
      +1 
    </div>

    <div className="left subject">{subject}</div>
    <div className="left predicate">{predicate} </div>
    <div className="left object">{object}</div> 
    
    <button onClick={() => onChoiceClick('agree')}>agree</button> <button onClick={() => onChoiceClick('disagree')}>disagree</button>
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