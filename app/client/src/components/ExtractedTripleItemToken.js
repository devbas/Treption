import React from 'react'

const ExtractedTripleItemToken = ({ 
  tokens, 
  isConcept, 
  onTokenRemoveClick, 
  connectDragSource
}) => {
  if(isConcept) {
    return connectDragSource(
      <div className="token-box animated bounceInDown">
        {tokens}
      </div>
    )
  } else {
    return (
      <div className="token-box">
        {tokens}
      </div>
    )
  }
}

export default ExtractedTripleItemToken