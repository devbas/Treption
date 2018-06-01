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
            <div className="title">Create or join a challenge</div>
            <div className="divider"></div>
            <div className="description">You are not in an active challenge right now.</div>
            <div className="button-box">
              <div className="primary-action" onClick={onCreateClick}>Create challenge</div>
              <div className="secondary-action" onClick={onJoinClick}>Join challenge</div>
            </div>
          </div>
        }

        {tournamentJoined === 'not found' &&
          <div>
            <div className="title">There are no active challenges right now.</div>
            <div className="divider"></div>
            <div className="description"></div>
            <div className="button-box">
              <div className="primary-action" onClick={onCreateClick}>Create challenge</div>
              <div className="secondary-action" onClick={onJoinClick}>Join challenge</div>
            </div>
          </div>
        }

        {tournamentCreated &&
          <div className="tournament-created-box">
            <div className="title">Challenge created!</div>
            <div className="divider"></div>
            <div className="description">Share this link to invite people for this challenge:</div>
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