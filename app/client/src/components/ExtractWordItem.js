import React from 'react';

const ExtractWordItem = ({ word, inactive, keystroke, onWordClick, wordState }) => (
  <div className={
    wordState === 'send' ? 'extract-word-item-box send' : 'extract-word-item-box receive'
  } onClick={onWordClick}>
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