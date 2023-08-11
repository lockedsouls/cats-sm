import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="LoginPage">
      <div className="LoginPageContainer">
        <h1>Welcome</h1>
        <form>
          <div className="inputContainer">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="RememberMe">
            <label className="checkbox">
              <input type="checkbox" id="rememberMeCheckbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <div className="ForgotPass">
              <label className="label1">
                Forgot password?
              </label>
            </div>
          </div>
          
          <button type="submit">Log in</button>

          <div className="CreateAccount">
              <label className="label2">
                Not a member?
              </label>
              <label className="label3">
                Create an account
              </label>
            </div>
        </form>
      </div>
    </div>
  );
}
