import React, {useState, useEffect} from 'react';
import './Admin-Dashboard.css';
import axios from "axios";

const AdminDashboard = () => {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getActiveSubscriptions").then((res) => {   
      if (res) {
        setActiveSubscriptions(res.data.subscriptions);
      } 
    });
  }, []);

  return (
    <div className="container mt-5" >
      <div className="dashboard-header">
        <h3 style={{ color: 'rgb(102 99 99)' }}>Active Subscriptions</h3>
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
            </tr>
          </thead>
          <tbody>
            {activeSubscriptions.map((subscription, index) => (
              <tr key={subscription.id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.client}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.service}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{subscription.va}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>${subscription.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
