import React from 'react';

const TripleLanding = ({ triples, renderTriple }) => (
  <div className="landing-box">
    <div className="inner-box">
      {triples.length > 0 &&
        <div>
          {triples.map(renderTriple)}
        </div>
      }
    </div>
  </div>
)

export default TripleLanding