import React from 'react';

const Tournament = ({ 
  onTournamentClick, 
  popupVisible
}) => (
  <div className="tournament-box">
    <div className="tournament-header-box" onClick={onTournamentClick}>
      <div className="inner-box">
        Current tournament
      </div>
    </div>

    {popupVisible &&
      <div className="popup-box">
        Popup!
      </div>
    }
    
  </div>
)

export default Tournament;