import React, {useState} from 'react';
import './Thanks-Enquiry.css';
import {Link} from 'react-router-dom';
import { useHireContext } from '../../App.js';
import { useAuth } from '../Auth/Auth';

const ThanksEnquiryPage = () => {
  const {balance
    } = useHireContext();
    const {isLoggedIn, setIsLoggedIn} = useAuth();

  return (
    <div className="thanks-enquiry-container">
      {isLoggedIn ?
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Thanks</h4>
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
      </div> : ''}
        <div className="thanks-enquiry-div">
              <p className='mt-4'>Thank you for your request, we will review it and send you a quote for your
                request within the hour</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Link to='/dashboard' className="btn btn-primary">Continue to Dashboard</Link>
        </div>
    </div>
  );
};

export default ThanksEnquiryPage;
