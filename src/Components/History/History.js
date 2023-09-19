import React, {useState, useEffect} from 'react';
import './History.css';
import axios from "axios";
import { useHireContext } from '../../App.js';

const History = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const {email} = useHireContext();

  useEffect(() => {
    const data = {
        email: email
    }
    axios.post("http://137.184.81.218:8000/getSubscriptionsOfVa", data).then((res) => {   
      if (res) {
        setSubscriptions(res.data.subscriptions);
      } 
    });
  }, []);

  return (
    <div className="container history-container mt-5" >
      <div className="dashboard-header">
        <h3 style={{ color: 'rgb(102 99 99)' }}>Subscriptions</h3>
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
              <tr key={subscription.id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.client}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.service}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.va}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>${subscription.fee}</td>
                <td style={{ border: 'none', textAlign: 'center' }} className={`project-status ${subscription.projectStatus.toLowerCase()}`}>
                    {subscription.projectStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
