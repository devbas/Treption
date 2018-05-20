import React from 'react';

const TripleItem = ({ subject, predicate, object, onChoiceClick }) => (
  <div className="triple-item-box left">
    <p className="left">{subject} {predicate} {object}</p> <button onClick={() => onChoiceClick('agree')}>agree</button> <button onClick={() => onChoiceClick('disagree')}>disagree</button>
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