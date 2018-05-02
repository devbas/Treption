import React from 'react';

const ExtractWordItem = ({ word, inactive, keystroke }) => (
  <div className={inactive ? 'extract-word-item-box inactive' : 'extract-word-item-box'}>
    <div className="character">
      {word}
    </div>
    <div className="shortkey">
        {keystroke}
    </div>
  </div>
)

export default ExtractWordItem