import React from 'react';

export default function LoginPage(){
    
    return (
        <div className="LoginPage">
          <h1>Welcome to Cat Posts</h1>
          <form>
            <input type="text" placeholder="Username/Email" />
            <input type="password" placeholder="Password" />
    
            <button type="submit">Log In</button>
          </form>
        </div>
      );
}