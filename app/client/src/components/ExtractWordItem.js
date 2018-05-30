import React from 'react';

const ExtractWordItem = ({ word, inactive, keystroke, onWordClick, wordState }) => (
  <div className={`extract-word-item-box ${inactive ? 'inactive' : 'active' }`} onClick={onWordClick}>
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