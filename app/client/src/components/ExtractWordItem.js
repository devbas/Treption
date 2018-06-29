import React from 'react';

const ExtractWordItem = ({ 
  word, 
  active, 
  keystroke, 
  onWordClick, 
  wordState, 
  isExtracting, 
  connectDragSource, 
  isDragging, 
  isSelected, 
  supportedTag
}) => {
  return connectDragSource(
    <div style={{'animation-delay': '-' + Math.random() + 's' }} className={`extract-word-item-box ${active ? 'active' : 'inactive' } ${isExtracting ? 'is-extracting' : 'is-validating'}`} onClick={supportedTag ? onWordClick : ''}>
      <span>
        {supportedTag &&
          <div className={`radio-button ${active ? 'active' : 'inactive'} ${isSelected ? 'selected' : 'unselected' }`}>
            {active &&
              <div className="hover-fill"></div>
            }
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