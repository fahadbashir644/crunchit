import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHireContext } from '../../App.js';
import './Settings.css';
import {Link} from 'react-router-dom';

const Settings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const {email, balance} = useHireContext();

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
        axios.post("http://16.171.177.188:8088/changePassword", data).then((res) => {
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
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Settings</h4>
        </div>
        <div className="col">
          <div className='p-2 balance-div'>
          <Link to="/topup" className="add-balance-btn btn btn-secondary">
                Topup
              </Link>
              <div className='balance-box'> 
                <h5>${balance}</h5>
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

export default Settings;
