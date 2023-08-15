import React from 'react';
import './Thanks-Purchase.css';
import {Link} from 'react-router-dom';

const ThanksPurchasePage = () => {
  return (
    <div className="summary-container">
        <div className="mt-4 form-group">
              <p> Thanks for your purchase, you VA will message you in the chat area shortly</p>
        </div>
        <div className="d-flex justify-content-center mt-6">
          <Link to='/enquiry' className="btn btn-secondary">Back</Link>
        </div>
    </div>
  );
};

export default ThanksPurchasePage;
