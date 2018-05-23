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
  onSuccessMessageClose
}) => (
  <div>
    {!isLoggedIn && isTournamentOpen &&
      <div>
        <p>You need to login!</p>
        <form>
          <div className="login-label">Enter your email:</div>
          <input type="email" className="login-email" value={email} placeholder="bastian.geneugelijk@student.uva.nl" onChange={onEmailChange} name="email"/>
          <div className="password-label">Create or enter your password:</div>
          <input type="password" className="login-password" value={password} onChange={onPasswordChange} name="password"/>
          <div className="login-next" onClick={onLoginClick}>Continue</div>
        </form>
      </div>
    }

    {!isTournamentOpen &&
      <p>The tournament is not available anymore</p>
    }

    {isLoggedIn && isTournamentOpen && joinedConsent &&
      <div>
        <p>Congrats, you are now playing against blabla</p>
        <button onClick={onSuccessMessageClose}>Play</button>
      </div>
    }

    {isLoggedIn && isTournamentOpen && !joinedConsent &&
      <div>
        <p>Would you like to participate in this tournament?</p>
        <button onClick={onConsentClick}>Play</button>
      </div>
    }
  </div>
)

export default AcceptInvite