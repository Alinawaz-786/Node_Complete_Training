// src/Login.tsx
import '../css/auth.css';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/DataContext';

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useMyContext();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-control">
          <label>email</label>
          <input
            type="text"
            placeholder="Enter your email"
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <Link to="/signup">SignUp</Link>|
      <Link to="/forget-password">Forget Password</Link>
      
    </div >
  );
};

export default Login;
