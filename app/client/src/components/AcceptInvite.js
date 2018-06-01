import React from 'react';

const AcceptInvite = ({ 
  isLoggedIn, 
  isTournamentOpen, 
  joinedConsent, 
  email, 
  password, 
  onLoginClick, 
  onEmailChange, 
  onPasswordChange, 
  onConsentClick, 
  onSuccessMessageClose, 
  loginError
}) => (
  <div className="accept-invite-box">
    {!isLoggedIn && isTournamentOpen &&
      <div className="card-box">
        <div className="inner-box">
          <div className="content">
            <div className="title">Login or register to continue</div>
            <div className="divider"></div>
            {loginError &&
              <div className="description">Email already taken or wrong password.</div>
            }
            <form>
              <div className="description">Enter your email:</div>
              <input type="email" className="login-email" value={email} placeholder="bastian.geneugelijk@student.uva.nl" onChange={onEmailChange} name="email"/>
              <div className="description">Create or enter your password:</div>
              <input type="password" className="login-password" value={password} onChange={onPasswordChange} name="password"/>
              <div className="button-box">
                <div className="primary-action" onClick={onLoginClick}>Continue</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    }

    {!isTournamentOpen &&
      <div className="card-box">
        <div className="inner-box">
          <div className="content">
            <div className="title">Challenge not found</div>
            <div className="divider"></div>
            <div className="description">The challenge has expired or is not found.</div>
          </div>
        </div>
      </div>
    }

    {joinedConsent === 'unavailable' &&
      <div className="card-box">
        <div className="inner-box">
          <div className="content">
            <div className="title">Challenge unavailable</div>
            <div className="divider"></div>
            <div className="description">The challenge is not available anymore.</div>
          </div>
        </div>
      </div>
    }

    {isLoggedIn && isTournamentOpen && joinedConsent === 'registered' &&
      <div className="card-box">
        <div className="inner-box">
          <div className="content">
            <div className="title">Good Luck!</div>
            <div className="divider"></div>
            <div className="description">You are now playing against blabla</div>
            <div className="button-box">
              <div onClick={onSuccessMessageClose} className="primary-action">Start</div>
            </div>
          </div>
        </div>
      </div>
    }

    {isLoggedIn && isTournamentOpen && !joinedConsent &&
      <div className="card-box">
        <div className="inner-box">
          <div className="content">
            <div className="title">Ready to play?</div>
            <div className="divider"></div>
            <div className="description">Would you like to participate in this challenge?</div>
            <div className="button-box">
              <div onClick={onConsentClick} className="primary-action">Play</div>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
)

export default AcceptInvite