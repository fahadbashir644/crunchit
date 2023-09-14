import React from 'react';
import axios from "axios";
import { useHireContext } from '../../App.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Set-Hourly-Rate.css';

const SetHourlyRate = () => {
  const {hourlyRate, setHourlyRate} = useHireContext();

  const handleSaveClick = () => {
    if (hourlyRate) {
      const data = {
        hourlyRate: hourlyRate,
      };
      axios.post("http://localhost:8000/setHourlyRate", data).then((res) => {   
        if (res) {
          toast.success('Hourly Rate Saved Successfully');
        } 
      });
    }
  };

  return (
    <div className="container d-flex-column mt-5">
      <h3 style={{ color: 'rgb(102 99 99)' }}>Set Hourly Rate</h3>
      <div className="mb-3 rate-div">
        <label className="form-label">Current Hourly Rate: {hourlyRate}</label>
        <label htmlFor="hourlyRate" className="form-label">Hourly Rate:</label>
        <input
          style={{width: '200px'}}
          type="number"
          className="form-control"
          id="hourlyRate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default SetHourlyRate;
