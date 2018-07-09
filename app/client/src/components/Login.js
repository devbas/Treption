import React from 'react';

const Login = ({ onEmailChange, onLoginClick, emailValue, onPasswordChange, userPassword }) => (
  <div className="login-box">
    <div className="inner-box">
      <form>
        <div className="login-label">Enter a name:</div>
        <input type="email" className="login-email" value={emailValue} onChange={onEmailChange} name="email"/>
        <div className="password-label">Create or enter your password:</div>
        <input type="password" className="login-password" value={userPassword} onChange={onPasswordChange} name="password"/>
        <div className="login-next" onClick={onLoginClick}>Continue</div>
      </form>
    </div>
  </div>
)

export default Login;