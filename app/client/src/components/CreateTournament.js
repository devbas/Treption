import React from 'react';

const CreateTournament = ({ 
  color
}) => (
  <div className="create-tournament-box">
    <div className="inner-box" style={{backgroundColor: color}}>
      <div className="content">
        <div className="title">Create or join a tournament</div>
        <div className="divider"></div>
      </div>
    </div>
  </div>
)

export default CreateTournament;