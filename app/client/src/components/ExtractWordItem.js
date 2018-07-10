import React from 'react';

const ExtractWordItem = ({ 
  word, 
  active, 
  onWordClick, 
  isExtracting, 
  connectDragSource, 
  isSelected, 
  supportedTag
}) => {
  return connectDragSource(
    <div style={{'animation-delay': '-' + Math.random() + 's' }} className={`extract-word-item-box ${active ? 'active' : 'inactive' } ${isExtracting ? 'is-extracting' : 'is-validating'}`} onClick={supportedTag ? onWordClick : ''}>
      <span>
        {supportedTag &&
          <div className={`radio-button ${active ? 'active' : 'inactive'} ${isSelected ? 'selected animated pulseToggle' : 'unselected' }`}>
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

export default ExtractWordItem