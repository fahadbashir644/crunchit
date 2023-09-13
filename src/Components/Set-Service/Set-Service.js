import React, { useState, useEffect } from 'react';
import './Set-Service.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetService = () => {
  const [services, setServices] = useState([]);

  const [newService, setNewService] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/getAllServices").then((res) => {   
      if (res) {
        setServices(res.data.services);
      } 
    });
  }, []);

  const handleAddService = () => {
    if (newService.trim() !== '') {
      const data = {
        service: newService,
      };
      axios.post("http://localhost:8000/addService", data).then((res) => {
        if (res) {
          setServices([...services, newService]);
          setNewService('');
          toast.success('Successfully Added New Service');
        }
      }).catch((error) => {
        if (error.response.status === 400){
          toast.error('Service With Same Name Already Exists');
        } else {
          toast.error('Something went wrong!');
        }
      })
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    const data = {
      service: serviceToRemove,
    };
    axios.post("http://localhost:8000/removeService", data).then((res) => {   
      if (res) {
        const updatedServices = services.filter((service) => service !== serviceToRemove);
        setServices(updatedServices);
        toast.success('Successfully Removed Service');
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="dashboard-header">
        <h3 style={{ color: 'rgb(102 99 99)' }}>Admin Dashboard</h3>
      </div>
      <div className="mb-3">
        <label htmlFor="newService" className="form-label">
          Add New Service:
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="newService"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddService}>
            Add
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h4>Existing Services:</h4>
        <ul className="list-group">
          {services.map((service) => (
            <li key={service} className="list-group-item d-flex justify-content-between align-items-center">
            {service}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveService(service)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SetService;
