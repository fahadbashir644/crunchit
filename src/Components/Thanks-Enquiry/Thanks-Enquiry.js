import React, {useState} from 'react';
import './Thanks-Enquiry.css';
import {Link} from 'react-router-dom';

const ThanksEnquiryPage = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
  return (
    <div className="summary-container">
        <h2 className='cstm-h2'>Enquiry</h2>
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
              <p className='mt-4'>Thank you for your request, we will review it and send you a quote for your
                request within the hour</p>
        </div>
        <div className="d-flex justify-content-center mt-6">
          <Link to='/payment' className="btn btn-secondary">Back</Link>
          <Link to='/purchase' className="btn btn-primary">Next</Link>
        </div>
    </div>
  );
};

export default ThanksEnquiryPage;
