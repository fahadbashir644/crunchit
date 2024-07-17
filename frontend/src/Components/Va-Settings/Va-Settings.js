import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHireContext } from '../../App.js';
import './Va-Settings.css';
import {Link} from 'react-router-dom';

const VaSettings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const {email, balance} = useHireContext();
  const [isAvailable, setIsAvailable] = useState(true); 

  useEffect(() => {
    const data = {
      email: email,
    };
    axios.post("http://137.184.81.218/getAvailability", data).then((res) => {   
      if (res) {
        setIsAvailable(res.data.available);
      } 
    });
}, []);

const handleToggleAvailability = () => {
  setIsAvailable(!isAvailable);
  const data = {
    email: email,
    available: !isAvailable,
  };
  axios.post("http://137.184.81.218/changeAvailability", data).then((res) => {   
    if (res) {
    } 
  });
};

  const handleChangePassword = () => {
    if (newPassword === confirmNewPassword) {
        if (newPassword.length < 8) {
            toast.error('Password must be atleast 8 characters long');
            return;
        }
        const data = {
            email: email,
            password: newPassword,
        };
        axios.post("http://137.184.81.218/changePassword", data).then((res) => {
        if (res) {
            setNewPassword('');
            setConfirmNewPassword('');
            toast.success('Password changed successfully!');
        }
        });
    } else {
      toast.error('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="container mt-5 pass-cont">
      <div className='row' style={{width : '100%'}}>
      <div className="col-md-6">
              <div className="availability-section">
                <div className="availability-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={handleToggleAvailability}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className={`availability-status ${isAvailable ? 'available' : 'unavailable'}`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
      </div>
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Settings</h4>
        </div>
        <div className="col">
          <div className='p-2 balance-div'>
              <div className='balance-box'> 
              <h5>Balance: ${balance}</h5>
                </div>
          </div>
        </div>
      </div>
      <form className='pass-div'>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control pass-input"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control pass-input"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default VaSettings;
