import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({ scope, documentId, userIdentifier }) => (
  <div className="header-box">
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