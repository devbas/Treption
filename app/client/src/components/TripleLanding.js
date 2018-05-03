import React from 'react';

const TripleLanding = ({ triples, renderTriple }) => (
  <div className="landing-box">
    <div className="inner-box">
      {triples.map(renderTriple)}
    </div>
  </div>
)

export default TripleLanding