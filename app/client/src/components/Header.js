import React from 'react';
import { Link } from 'react-router-dom'
import Tournament from '../containers/Tournament'

const Header = ({ 
  scope, 
  documentId, 
  userIdentifier, 
  tournament 
}) => (
  <div className="header-box">
    {tournament.length > 0 &&
      <Tournament/>
    }
    
    <div className="inner-box">
      {scope === 'extract' &&
        <div>
          <Link to={'/document/' + documentId}>
            <div className="close-game-box">
            </div>
          </Link>

          <div className="tournament-overview-box">
          </div>
        </div>
      }
      <div className="profile-box">
        <div className="profile-label">{userIdentifier}</div>
        <div className="profile-menu"></div>
      </div>
    </div>
  </div>
)

export default Header