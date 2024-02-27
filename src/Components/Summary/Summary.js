import React, { useMemo } from 'react';
import { useHireContext } from '../../App.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faDollarSign, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const headingStyle = {
  color: 'rgb(102, 99, 99)',
  marginLeft: '8px',
  marginTop: '-3px'
};

const SummaryPage = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const {
    workingHours,
    selectedService,
    customService,
    totalPrice,
    selectedTimezone,
    balance
  } = useHireContext();

  const totalHours = useMemo(() => {
    const selectedHours = Array.from(workingHours.values()).flat();
    return selectedHours.length;
  }, [workingHours]);

  const formatHours = (hour) => {
    let timeZone = 'AM';
    if (hour >= 12) {
      timeZone = 'PM';
      if (hour > 12) {
        hour = hour - 12;
      }
    }
    return `${hour}:00 ${timeZone}`;
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ?
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Summary</h4>
        </div>
        <div className="col">
          <div className='p-2 balance-div'>
          <Link to="/topup" className="add-balance-btn btn btn-secondary">
                Topup
              </Link>
              <div className='balance-box'> 
                <h5>${balance}</h5>
                </div>
          </div>
        </div>
      </div> : ''}
      {/* <h2 className="text-center mb-4" style={{color: 'rgb(102, 99, 99)'}}>Summary</h2> */}
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <div className='d-flex'>
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            <h5 style={headingStyle}>Selected Service:</h5>
            </div>
            <p>{selectedService?.name === 'Other' ? customService : selectedService?.name}</p>
          </div>
          <div className="mb-4">
          <div className='d-flex'>
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <h5 style={headingStyle}>Selected Timezone:</h5>
            </div>
            <p>{selectedTimezone?.value}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-4">
          <div className='d-flex'>
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            <h5 style={headingStyle}>Total Price:</h5>
            </div>
            <p>${totalPrice}</p>
          </div>
          <div className="mb-4">
          <div className='d-flex'>
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <h5 style={headingStyle}>Total Hours:</h5>
            </div>
            <p>{totalHours}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h4 className="mt-4" style={{color: 'rgb(102, 99, 99)'}}>Working Hours by Date:</h4>
          {Array.from(workingHours.entries()).map(([date, hours]) => (
            <div className="card mb-4" key={date}>
              <div className="card-body">
                <h6 className="card-title font-weight-bold">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  {date}
                </h6>
                <ul className="list-group list-group-flush">
                  {hours.map((hour) => (
                    <li className="list-group-item" key={hour}>
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      {formatHours(hour)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Link to="/schedule" className="btn btn-secondary mr-3">
          Back
        </Link>
        <Link to="/payment" className="btn btn-primary">
          Next
        </Link>
      </div>
    </div>
  );
};

export default SummaryPage;
