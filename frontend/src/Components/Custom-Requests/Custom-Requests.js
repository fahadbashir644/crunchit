import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomRequests = () => {
  const [hiringRequests, setHiringRequests] = useState([]);

  useEffect(() => {
    axios.get("http://16.171.177.188:8000/getCustomRequests").then((res) => {   
      if (res) {
        setHiringRequests(res.data.hiringRequests);
      } 
    });
  }, []);

  return (
    <div className="container mt-5">
      <h3 style={{ color: 'rgb(102 99 99)' }}>Custom Requests</h3>
      <div className="table-responsive mt-4" style={{minHeight: '60vh'}}>
        <table className="table table-striped">
          <thead style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }} scope="col">#</th>
              <th style={{ border: 'none' }}>Client Name</th>
              <th style={{ border: 'none' }}>Service</th>
              <th style={{ border: 'none' }}>Total Price</th>
              <th style={{ border: 'none' }}>Total Hours</th>
              <th style={{ border: 'none' }}>Timezone</th>
              <th style={{ border: 'none' }}>Enquiry</th>
            </tr>
          </thead>
          <tbody>
            {hiringRequests.map((request, index) => (
              <tr key={request._id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{request.client}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{request.service}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  ${request.fee}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>{request.totalHours}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  {request.timezone}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  {request.enquiry}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomRequests;
