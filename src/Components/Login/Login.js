import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useAuth } from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHireContext } from '../../App.js';

const LoginPage = () => {
  const {email, setEmail, setBalance, setIsVa, setIsAdmin, setIsActive} = useHireContext();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    setIsLoggedIn
  } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
 
    axios
    .post("http://137.184.81.218:8000/login", {
      header: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: password,
      },
    })
    .then((response) => {
      setIsLoggedIn(true);
      setIsVa(response.data.user.isVa);
      sessionStorage.setItem('email', response.data.user.email);
      if (response.data.user.isAdmin) {
        sessionStorage.setItem('isAdmin', response.data.user.isAdmin);
      } else if (response.data.user.isVa) {
        sessionStorage.setItem('isVa', response.data.user.isVa);
      }
      sessionStorage.setItem('token', response.data.token);
      setBalance(response.data.user.balance);
      setIsAdmin(response.data.user.isAdmin);
      if (response.data.user?.isAdmin) {
        setIsActive(true);
      }
      navigate('/dashboard');
    }).catch((error) => {
      if (error.response.status === 400) {
        toast.error("Incorrect Email/Password");
      } else {
        toast.error("Email does not exists");
      }
    });
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
