import React from 'react';
import './Thanks-Purchase.css';
import {Link} from 'react-router-dom';
import { useHireContext } from '../../App.js';
import { useAuth } from '../Auth/Auth';

const ThanksPurchasePage = () => {
  const {balance
    } = useHireContext();
    const {isLoggedIn, setIsLoggedIn} = useAuth();

  return (
    <div className="purchase-container">
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
        <div className="mt-4 form-group purchase-div">
              <p> Thanks for your purchase, you VA will message you in the chat area shortly</p>
        </div>
        <div className="d-flex justify-content-center mt-1">
        <Link to='/dashboard' className="btn btn-primary">Continue to Dashboard</Link>
        </div>
    </div>
  );
};

export default ThanksPurchasePage;
