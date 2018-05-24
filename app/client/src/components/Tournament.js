import React from 'react';

const Tournament = ({ 
  onTournamentClick, 
  popupVisible, 
  tournament
}) => (
  <div className="tournament-box">
    <div className="tournament-header-box" onClick={onTournamentClick}>
      <div className="inner-box">
        <div className="left">
          {tournament.challenger_name}
        </div>
        <div className="right">
          {tournament.competitor_name}
        </div>
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