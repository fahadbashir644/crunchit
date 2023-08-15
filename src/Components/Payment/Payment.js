import React, {useState} from 'react';
import './Payment.css';
import {Link} from 'react-router-dom';
import axios from "axios";

const PaymentPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePayClick = () => {
        var data = JSON.stringify({
        ipn_callback_url: "https://ozchest.com/ipn",
        success_url: "https://ozchest.com",
        cancel_url: "https://google.com",
        });

        var config = {
        method: "post",
        url: "http://api.nowpayments.io/v1/invoice",
        headers: {
            "x-api-key": "535HF7P-YHW4KWY-NC8VTAW-931RC7Q",
            "Content-Type": "application/json",
        },
        data: data,
        };

        axios(config)
        .then(function (response) {
            if (response) {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=500,height=500`;
            window.open(response.data.invoice_url, "test", params);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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
