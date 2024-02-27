import React, {useState, useEffect} from 'react';
import './Pending-Requests.css';
import axios from "axios";
import { useHireContext } from '../../App.js';
import {Link} from 'react-router-dom';

const PendingRequests = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const {email, balance} = useHireContext();

  useEffect(() => {
    const data = {
        email: email
    }
    axios.post("http://137.184.81.218:8000/getPendingRequests", data).then((res) => {   
      if (res) {
        setSubscriptions(res.data.subscriptions);
      } 
    });
  }, []);

  return (
    <div className="container history-container mt-5" >
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Pending Requests</h4>
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
      <div className="table-responsive mt-4">
        <table className="table">
          <thead className="fw-bold" style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }} scope="col">#</th>
              <th style={{ border: 'none' }} scope="col">Client Name</th>
              <th style={{ border: 'none' }} scope="col">Service</th>
              <th style={{ border: 'none' }} scope="col">VA Name</th>
              <th style={{ border: 'none' }} scope="col">Total Price</th>
              <th style={{ border: 'none' }} scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={subscription._id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.client}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.service}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>Not Assigned</td>
                <td style={{ border: 'none', textAlign: 'center' }}>${subscription.fee}</td>
                <td style={{ border: 'none', textAlign: 'center' }} className={`project-status ${subscription.projectStatus.toLowerCase()}`}>
                    Pending
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
