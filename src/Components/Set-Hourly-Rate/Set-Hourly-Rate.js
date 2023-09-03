import React, { useState } from 'react';

const SetHourlyRate = () => {
  const [hourlyRate, setHourlyRate] = useState('');

  const handleSaveClick = () => {
    // Handle saving the hourly rate
    if (hourlyRate) {
      // Replace this with your saving logic
      console.log(`Saved hourly rate: ${hourlyRate}`);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Set Hourly Rate</h1>
      <div className="mb-3">
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
