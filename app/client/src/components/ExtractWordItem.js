import React from 'react';

const ExtractWordItem = ({ 
  word, 
  inactive, 
  keystroke, 
  onWordClick, 
  wordState, 
  isExtracting 
}) => (
  <div className={`extract-word-item-box ${inactive ? 'inactive' : 'active' } ${isExtracting ? 'is-extracting' : 'is-validating'}`} onClick={onWordClick}>
    <span>
      <div className="character">
        {word}
      </div>
      <div className="shortkey">
      </div>
    </span>
  </div>
)

//inactive ? 'extract-word-item-box inactive' : 'extract-word-item-box'

//{keystroke}

export default ExtractWordItem