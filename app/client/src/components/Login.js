import React from 'react';

const Login = ({ onEmailChange, onLoginClick, emailValue, onPasswordChange, userPassword }) => (
  <div className="login-box">
    <div className="inner-box">
      <div className="login-label">Enter your email:</div>
      <input type="email" className="login-email" value={emailValue} placeholder="bastian.geneugelijk@student.uva.nl" onChange={onEmailChange}/>
      <div className="password-label">Create or enter your password:</div>
      <input type="password" className="login-password" value={userPassword} onChange={onPasswordChange}/>
      <div className="login-next" onClick={onLoginClick}>Continue</div>
    </div>
  </div>
)

export default Login;