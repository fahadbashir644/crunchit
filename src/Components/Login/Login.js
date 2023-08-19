import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useAuth } from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    setIsLoggedIn
  } = useAuth();

  const handleLogin = () => {
    axios
    .post("http://localhost:8000/login", {
      header: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: password,
      },
    })
    .then((response) => {
      setIsLoggedIn(true);
      navigate('/');
    }).catch((error) => {
      toast.error("Incorrect Email/Password");
    });;
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            style={{width: '300px'}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            style={{width: '300px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
