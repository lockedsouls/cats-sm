import React from 'react';

export default function LoginPage(){
    
    return (
        <div className="LoginPage">
          <h1>Welcome</h1>
          <form>
            <input type="text" placeholder="Username/Email" />
            <input type="password" placeholder="Password" />
    
            <button type="submit">Log in</button>
          </form>
        </div>
      );
}