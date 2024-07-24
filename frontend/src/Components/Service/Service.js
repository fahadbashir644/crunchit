import React, {useState, useEffect} from 'react';
import { useHireContext } from '../../App.js';
import {Link} from 'react-router-dom';
import './Service.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

const ServiceForm = () => {
  const [services, setServices] = useState([]);
  const {isLoggedIn, setIsLoggedIn} = useAuth();
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
const navigate = useNavigate();

const {
  selectedService,
  setSelectedService,
  customService,
  setCustomService,
  setWorkingHours,
  setTotalPrice,
  balance
} = useHireContext();

useEffect(() => {
  axios.get("http://16.171.177.188:8000/getAllServices").then((res) => {   
    if (res) {
      setServices(res.data.services);
    } 
  });
}, []);

  const handleServiceChange = (event) => {
    let service = services.find((service) => service.name === event.target.value);
    if(!service) {
      service = {
        name: 'Other',
        rate: 0
      };
    }
    setSelectedService(service);
    setCustomService("");
    setWorkingHours(new Map());
    setTotalPrice(0);
  };

  const handleCustomServiceChange = (event) => {
    setCustomService(event.target.value);
  };

  const isCustomServiceValid = selectedService.name !== 'Other' || customService.trim() !== '';

  const handleNextClick = () => {
    if (isCustomServiceValid) {
      navigate('/schedule');
    } else {
      toast.error('Please enter a valid custom service');
    }
  };

  return (
    <div className='container mt-5' style={{minHeight: '60vh'}}>
      {isLoggedIn ?
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Select Service</h4>
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
      <form>
          <div className="form-group service-div">
              <label htmlFor="serviceSelect">Service:</label>
              <select
              className="form-control service-input1"
              id="serviceSelect"
              value={selectedService.name}
              onChange={(e) => handleServiceChange(e)}
              >
              <option value="">Select...</option>
              {services.map((service, index) => (
                  <option key={index} value={service.name}>
                  {service.name}
                  </option>
              ))}
              <option value="Other">Other</option>
              </select>
          </div>
          {selectedService.name === 'Other' && (
              <div className="mt-4 form-group service-div">
              <label htmlFor="customServiceInput">Custom Service:</label>
              <input
                  type="text"
                  className="form-control service-input1"
                  id="customServiceInput"
                  value={customService}
                  onChange={handleCustomServiceChange}
              />
              </div>
          )}
      </form>
      <div className="d-flex justify-content-center mt-6">
        <button className="mt-4 btn btn-primary" onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default ServiceForm;
