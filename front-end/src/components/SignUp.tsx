// src/SignUp.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/auth.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleLogin = (e:any) => {
    e.preventDefault()
    const graphqlQuery =  {
      query:`
      mutation{
        createUser(userInput:
          {email:"${email}",name:"${username}",password:"${password}"})
        {
          _id
          email
        }
      }`
    };
    //Rest Api
    // const url = "http://localhost:4000/api/signup";
    //GraphQl
    const url = "http://localhost:4000/graphql";
    try {
      console.log(email,password);
      
      let method = 'POST';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(graphqlQuery)
        // body: JSON.stringify({
        //   email: email,
        //   name: username,
        //   password: password,
        //   repeatPassword: repeatPassword,
        // })
      })
        .then((res) => res.json())
        .then((d) => {
          if(d.errors && d.errors[0].status === 422){
            throw new Error("validation Failed. on Server side response");
          }
          if(d.errors && d.errors[0].data){
            console.log(d.errors[0].data);
            // throw new Error("validation Failed. on Server side response");
          }
          if(d.errors){
            throw new Error("User Creation failed");
          }
          console.log("This is ",d.userId,d.message);
          // setPost([...post, d.product]);
          // console.log(post);
          // setQty('');
          // setPrice('');
          // setTitle('');
          // setDescription('');
          // navigationHistory('/product');
        })


    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Repeat Password</label>
          <input
            type="password"
            placeholder="Enter your Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignUp;
