import React from 'react';

const ExtractPredicateItem = ({ value, id, onPredicateClick }) => (
  <div className="extract-predicate-item-box" onClick={onPredicateClick}>
    <div className="checkbox">
      <div className="inner-knob">
      </div>
    </div>
    <div className="label">{value}</div>
  </div>
)

export default ExtractPredicateItem