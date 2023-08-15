import React from 'react';
import { useHireContext } from '../../App.js';
import {Link} from 'react-router-dom';

const ServiceForm = () => {
  const servicesList = [
    'Data entry',
    'Social media',
    'LinkedIn assistant',
    'Bookkeeping',
    'Graphic design',
    'Real estate',
    'E-commerce',
    'Administrative',
    'Customer support/managet',
    'Research assistant',
    'Marketing assistant',
    'Website management',
    'Shopify assistant',
    'Community manager',
    'Content manager',
    'Copywriter',
    'Trading and business transactions',
    'Crypto transactions'
];
const {
  selectedService,
  setSelectedService,
  customService,
  setCustomService
} = useHireContext();

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCustomServiceChange = (event) => {
    setCustomService(event.target.value);
  };

  return (
    <div className='container mt-5' style={{minHeight: '60vh'}}>
      <form>
          <div className="form-group">
              <label htmlFor="serviceSelect">Service:</label>
              <select
              className="form-control"
              id="serviceSelect"
              value={selectedService}
              style={{width: "50%"}}
              onChange={handleServiceChange}
              >
              <option value="">Select...</option>
              {servicesList.map((service, index) => (
                  <option key={index} value={service}>
                  {service}
                  </option>
              ))}
              <option value="Other">Other</option>
              </select>
          </div>
          {selectedService === 'Other' && (
              <div className="mt-4 form-group">
              <label htmlFor="customServiceInput">Custom Service:</label>
              <input
                  type="text"
                  className="form-control"
                  id="customServiceInput"
                  value={customService}
                  style={{width: "50%"}}
                  onChange={handleCustomServiceChange}
              />
              </div>
          )}
      </form>
      <div className="d-flex justify-content-center mt-6">
        <Link to='/schedule' className="mt-4 btn btn-primary">Next</Link>
      </div>
    </div>
  );
};

export default ServiceForm;
