// src/ForgetPassword.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/auth.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgetPssword = () => {
    // // Add your login logic here
    // console.log('Username:', username);
    // console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2>ForgetPassword</h2>
      <form>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleForgetPssword}>
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>

    </div>
  );
};

export default ForgetPassword;
