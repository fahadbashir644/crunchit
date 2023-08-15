import React, { useMemo } from 'react';
import './Summary.css';
import { useHireContext } from '../../App.js';
import {Link} from 'react-router-dom';

const SummaryPage = () => {

  const {
    workingHours,
    selectedService,
    customService,
    totalPrice,
  } = useHireContext();

  const totalHours = useMemo(() => {
    const selectedHours = Array.from(workingHours.values()).flat();
    return selectedHours.length;
  }, [workingHours]);

  const formatHours = (hour) => {
    let timeZone = 'am';
    if (hour >= 12) {
      timeZone = 'pm';
      if (hour > 12) {
        hour = hour  - 12;
      }
    } 
    return hour + ":00 " + timeZone;
  };
  return (
    <div className="summary-container">
      <h2 className='cstm-h2'>Summary</h2>
      <p>Selected Service: {selectedService == 'Other' ? customService : selectedService}</p>
      <p>Working Hours: {totalHours}</p>
      <p>Total Price: ${totalPrice}</p>

      <div className="working-hours-list">
        <h4>Working Hours by Date:</h4>
        {Array.from(workingHours.entries()).map(([date, hours]) => (
          <div key={date}>
            <p>{date}</p>
            <ul>
              {hours.map((hour) => (
                <li key={hour}>{formatHours(hour)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-6">
          <Link to='/schedule' className="btn btn-secondary">Back</Link>
          <Link to='/payment' className="btn btn-primary">Next</Link>
        </div>
    </div>
  );
};

export default SummaryPage;
