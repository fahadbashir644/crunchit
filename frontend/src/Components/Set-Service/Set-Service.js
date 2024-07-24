import React, { useState, useEffect } from 'react';
import './Set-Service.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetService = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [newServiceRate, setNewServiceRate] = useState('');

  useEffect(() => {
    axios.get("http://16.171.177.188:8000/getAllServices").then((res) => {   
      if (res) {
        setServices(res.data.services);
      } 
    });
  }, []);

  const handleAddService = () => {
    if (newService.trim() !== '' && newServiceRate.trim() !== '') {
      const data = {
        service: newService,
        rate: newServiceRate,
      };
      axios.post("http://16.171.177.188:8000/addService", data).then((res) => {
        if (res) {
          setServices([...services, res.data]);
          setNewService('');
          setNewServiceRate('');
          toast.success('Successfully Added New Service');
        }
      }).catch((error) => {
        if (error.response.status === 400){
          toast.error('Service With Same Name Already Exists');
        } else {
          toast.error('Something went wrong!');
        }
      });
    } else {
      toast.error('Please enter all fields of new service');
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    const data = {
      service: serviceToRemove,
    };
    axios.post("http://16.171.177.188:8000/removeService", data).then((res) => {   
      if (res) {
        const updatedServices = services.filter((service) => service.name !== serviceToRemove);
        setServices(updatedServices);
        toast.success('Successfully Removed Service');
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  const handleSetRate = (service) => {
    const data = {
      service: service._id,
      rate: service.rate,
    };
    axios.post("http://16.171.177.188:8000/setServiceRate", data).then((res) => {
      if (res) {
        toast.success(`Rate for ${service.name} updated successfully`);
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  const handleRateChange = (index, event) => {
    const newServices = [...services];
    newServices[index].rate = event.target.value;
    setServices(newServices);
  };

  return (
    <div className="container d-flex-column mt-5">
      <div className="dashboard-header d-flex-row">
        <h3 style={{ color: 'rgb(102 99 99)' }}>Add New Service</h3>
      </div>
      <div className="mb-3 d-flex-row">
        <div className="input-group">
          <input
            type="text"
            className="form-control mr-3 service-input margin-r"
            id="newService"
            placeholder="Service Name"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
          />
          <input
            type="number"
            min='0'
            className="form-control mr-3 margin-r"
            id="newServiceRate"
            placeholder="Rate"
            value={newServiceRate}
            onChange={(e) => setNewServiceRate(e.target.value)}
          />
          <button className="btn btn-primary" onClick={()=> handleAddService()}>
            Add
          </button>
        </div>
      </div>
      <div className="mt-4 d-flex-row">
        <h4 style={{ color: 'rgb(102 99 99)' }}>Existing Services</h4>
        <table className="table services-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{service.name}</td>
              <td className='cstm-dflex'>
                <input
                  type="number"
                  className="form-control"
                  min='0'
                  placeholder="Service Rate"
                  style={{width: '100px'}}
                  value={service.rate || 0}
                  onChange={(e) => handleRateChange(index, e)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveService(service.name)}
                >
                  Remove
                </button>
                <button
                className="btn btn-primary btn-sm ml-2"
                onClick={() => handleSetRate(service)}
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

export default SetService;
