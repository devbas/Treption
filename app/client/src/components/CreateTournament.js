import React from 'react';

const CreateTournament = ({ 
  color, 
  onCreateClick, 
  onJoinClick, 
  tournamentCreated, 
  tournament, 
  hostname, 
  onPlayClick, 
  tournamentJoined
}) => (
  <div className="create-tournament-box">
    <div className="inner-box" style={{backgroundColor: color}}>
      <div className="content">
        {!tournamentCreated && tournamentJoined !== 'not found' &&
          <div>
            <div className="title">Create or join a tournament</div>
            <div className="divider"></div>
            <div className="description">You are not in an active tournament right now.</div>
            <div className="button-box">
              <div className="primary-action" onClick={onCreateClick}>Create tournament</div>
              <div className="secondary-action" onClick={onJoinClick}>Join tournament</div>
            </div>
          </div>
        }

        {tournamentJoined === 'not found' &&
          <div>
            <div className="title">There are no active tournaments right now.</div>
            <div className="divider"></div>
            <div className="description"></div>
            <div className="button-box">
              <div className="primary-action" onClick={onCreateClick}>Create tournament</div>
              <div className="secondary-action" onClick={onJoinClick}>Join tournament</div>
            </div>
          </div>
        }

        {tournamentCreated &&
          <div className="tournament-created-box">
            <div className="title">Tournament created!</div>
            <div className="divider"></div>
            <div className="description">Share this link to invite people in this tournament:</div>
            <input type="text" value={`${hostname}/invite/${tournament.hash}`} disabled/>
            <div className="description">In the meantime, you can already start playing.</div>
            <div className="button-box">
              <div className="primary-action" onClick={onPlayClick}>Start</div>
            </div>
          </div>
        }
        
      </div>
    </div>
  </div>
)

export default CreateTournament;