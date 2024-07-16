import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isVa, setIsVa] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
      return;
    }
    axios
    .post("http://137.184.81.218/signup", {
      header: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: password,
        name: name,
        isVa: isVa
      },
    })
    .then((response) => {
      navigate('/login');
    }).catch((error) => {
      toast.error("Email already registered");
    });;
  };

  const handleCheckboxChange = (event) => {
    setIsVa(event.target.checked);
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            style={{width: '300px'}}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className='d-flex-cstm mb-3'>
          <label className='mt-1' style={{ display: 'flex', alignItems: 'center' }}>
            <span>is VA:</span>
            <input
              type="checkbox"
              style={{ marginLeft: '-50px' }}
              checked={isVa}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
