import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VirtualAssistants = () => {
  const [virtualAssistants, setVirtualAssistants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getAllVas').then((res) => {
      if (res) {
        setVirtualAssistants(res.data.vas);
      }
    });
  }, []);

  const handleSetRate = (selectedVaId, rate) => {
    const data = {
      va: selectedVaId,
      vaRate: rate
    };
    axios.post("http://localhost:8000/setRateOfVa", data).then((res) => {   
      if (res) {
        toast.success('Successfully Updated Rate of VA');
      } 
    });
  };

  const handleRateChange = (index, event) => {
    const newVirtualAssistants = [...virtualAssistants];
    newVirtualAssistants[index].vaRate = event.target.value;
    setVirtualAssistants(newVirtualAssistants);
  };

  return (
    <div className="container mt-5">
      <h3 style={{ color: 'rgb(102 99 99)' }}>Virtual Assistants</h3>
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }}>#</th>
              <th style={{ border: 'none' }}>Name</th>
              <th style={{ border: 'none' }}>Status</th>
              <th style={{ border: 'none' }}>Rate</th>
              <th style={{ border: 'none' }}>Assign</th>
            </tr>
          </thead>
          <tbody>
            {virtualAssistants.map((assistant, index) => (
              <tr key={assistant._id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{assistant.name}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  {assistant.available === true ? (
                    <button className="btn btn-success" style={{ width: '90px' }}>
                      Active
                    </button>
                  ) : (
                    <button className="btn btn-secondary" disabled style={{ width: '90px' }}>
                      Inactive
                    </button>
                  )}
                </td>
                <td style={{ border: 'none', textAlign: 'center', width: '100px' }}>
                  <input
                    type="number"
                    value={assistant.vaRate || 0}
                    onChange={(e) => handleRateChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  <button
                    className="btn btn-primary"
                    style={{ color: '#b9b08' }}
                    onClick={() => handleSetRate(assistant._id, assistant.vaRate)}
                  >
                    Set Rate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VirtualAssistants;
