import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HiringRequests = () => {
  const [hiringRequests, setHiringRequests] = useState([]);
  const [virtualAssistants, setVirtualAssistants] = useState([]);

  useEffect(() => {
    axios.get("http://137.184.81.218:8000/getHiringRequests").then((res) => {   
      if (res) {
        setHiringRequests(res.data.hiringRequests);
      } 
    });

    axios.get("http://137.184.81.218:8000/getAvailableVas").then((res) => {   
      if (res) {
        setVirtualAssistants(res.data.vas);
      } 
    });
  }, []);

  const [selectedVaMap, setSelectedVaMap] = useState({});

  const handleVaSelect = (requestId, va) => {
    setSelectedVaMap({
      ...selectedVaMap,
      [requestId]: va,
    });
  };

  const handleAssignVa = (requestId) => {
    const selectedVaId = selectedVaMap[requestId];
    if (selectedVaId) {
      const data = {
        va: selectedVaId,
        subscriptionId: requestId
      };
      axios.post("http://137.184.81.218:8000/handleSubscription", data).then((res) => {   
        if (res) {
          setHiringRequests((prevRequests) => prevRequests.filter(request => request._id !== requestId));
          toast.success('Successfully assigned VA')
        } 
      });
    } else {
      toast.error('Please select a Virtual Assistant.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 style={{ color: 'rgb(102 99 99)' }}>Hiring Requests</h3>
      <div className="table-responsive mt-4" style={{minHeight: '60vh'}}>
        <table className="table table-striped">
          <thead style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }} scope="col">#</th>
              <th style={{ border: 'none' }}>Client Name</th>
              <th style={{ border: 'none' }}>Service</th>
              <th style={{ border: 'none' }}>Total Price</th>
              <th style={{ border: 'none' }}>Total Hours</th>
              <th style={{ border: 'none' }}>Virtual Assistant</th>
              <th style={{ border: 'none' }}>Assign</th>
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
                <td style={{ border: 'none', textAlign: 'center' }}>
                  {request.totalHours}
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <select
                    className="form-select"
                    value={selectedVaMap[request._id] || ''}
                    onChange={(e) => handleVaSelect(request._id, e.target.value)}
                  >
                    <option value="">Select VA</option>
                    {virtualAssistants.map((va) => (
                      <option key={va._id} value={va.email}>
                        {va.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <button className="btn btn-primary" style={{color: '#b9b08'}} onClick={()=>handleAssignVa(request._id)}>Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HiringRequests;
