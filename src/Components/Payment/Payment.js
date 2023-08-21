import React, {useState, useEffect} from 'react';
import './Payment.css';
import {Link} from 'react-router-dom';
import { useHireContext } from '../../App.js';
import { useAuth } from '../Auth/Auth';
import axios from "axios";

const PaymentPage = () => {
    const [password, setPassword] = useState('');
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const {balance, 
      setBalance,
      email,
      setEmail
     } = useHireContext();

    useEffect(() => {
      if(isLoggedIn) {
        const data = {
          email: email,
        };
        axios.post("http://localhost:8000/getbalance", data).then((res) => {   
          if (res) {
              setBalance(res.data.balance);
          } 
        });
      }
  });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePayClick = () => {
        
    };
  return (
    <div className="summary-container">
        <h2 className='cstm-h2'>Make Payment</h2>
        <div className="mt-4 form-group">
              <label>Email:</label>
              <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  value={email}
                  style={{width: "50%"}}
                  onChange={handleEmailChange}
              />
              <label className='mt-4'>Password:</label>
              <input
                  type="password"
                  className="form-control"
                  id="emailInput"
                  value={password}
                  style={{width: "50%"}}
                  onChange={handlePasswordChange}
              />
              <button className='btn btn-primary mt-4' onClick={handlePayClick}>Pay</button>
        </div>
        <div className="d-flex justify-content-center mt-6">
          <Link to='/summary' className="btn btn-secondary">Back</Link>
          <Link to='/enquiry' className="btn btn-primary">Next</Link>
        </div>
    </div>
  );
};

export default PaymentPage;
