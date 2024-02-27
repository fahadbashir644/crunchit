import React, { useState, useEffect } from 'react';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Topup.css';
import {Link} from 'react-router-dom';

const Topup = () => {
    const [topup, setTopup] = useState(0);
    const {balance,
           email,
           handleAddBalance
          } = useHireContext();

  const handleTopupChange = (event) => {
    setTopup(event.target.value);
  };

  const handleTopUp = () => {
        axios.post("http://137.184.81.218:8000/topup", {
        header: { "Content-Type": "application/json" },
        data : JSON.stringify({
            price_amount: topup,
            price_currency: "usd",
            order_description: email,
            ipn_callback_url: "http://137.184.81.218/ipn",
            success_url: "https://nowpayments.io",
            cancel_url: "https://nowpayments.io"
            })
        })
        .then((response) => {
            if (response) {
                let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=500,height=500`;
                window.open(response.data.invoice_url, "test", params);
            }
        }).catch((error) => {
          toast.error("Error occurred while topup");
        });
  };

  return (
    <div className="dashboard">
        <div className='container'>
        <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Add Balance</h4>
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
    <div className="topup-container">
            <div className="balance-topup">
            <div className="mt-4 form-group">
              <label >Topup:</label>
              <input
                type="text"
                className="form-control"
                id="topupInput"
                value={topup}
                onChange={handleTopupChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleTopUp}>
              Top Up
            </button>
          </div>
        </div>
        </div>
  </div>
  );
};

export default Topup;
