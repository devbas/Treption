import React from 'react';

const ExtractWordItem = ({ 
  word, 
  active, 
  keystroke, 
  onWordClick, 
  wordState, 
  isExtracting, 
  connectDragSource, 
  isDragging
}) => {
  return connectDragSource(
    <div className={`extract-word-item-box ${active ? 'active' : 'inactive' } ${isExtracting ? 'is-extracting' : 'is-validating'}`} onClick={onWordClick}>
      <span>
        {active &&
          <div className="radio-button">
            <div className="hover-fill"></div>
          </div>
        }
        <div className="character">
          {word}
        </div>
        <div className="shortkey">
        </div>
      </span>
    </div>
  )
}

//inactive ? 'extract-word-item-box inactive' : 'extract-word-item-box'

//{keystroke}

export default ExtractWordItem