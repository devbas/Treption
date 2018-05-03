import React from 'react';

const TripleItem = ({ subject, predicate, object }) => (
  <div className="triple-item-box">
    <p>{subject} {predicate} {object}</p>
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