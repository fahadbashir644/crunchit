import React, { useState, useMemo } from 'react';
import './Enquiry.css';
import { Link } from 'react-router-dom';
import { useHireContext } from '../../App.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

const EnquiryPage = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
    const [email, setEmail] = useState('');
    const [enquiry, setEnquiry] = useState('');
    const {balance,
      totalPrice,
      workingHours,
      customService,
      selectedTimezone
      } = useHireContext();
    const navigate = useNavigate();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEnquiryChange = (event) => {
        setEnquiry(event.target.value);
    };

    const totalHours = useMemo(() => {
      const selectedHours = Array.from(workingHours.values()).flat();
      return selectedHours.length;
    }, [workingHours]);

    const handleEnquiry = (event) => {
      if (email.trim() === '' || enquiry.trim() === '') {
        toast.error('Enter all fields');
        return;
      }
      let hours = {};
      workingHours.forEach((value,key) => {
        hours[key] = value;
      });
      const data = {
        email: email,
        price: totalPrice,
        selectedService: customService,
        totalHours: totalHours,
        workingHours: hours,
        timezone: selectedTimezone?.value,
        enquiry: enquiry
      };
      axios.post("http://localhost:8000/handleEnquiry", data).then((res) => {   
        if (res) {
            navigate('/thanksEnquiry');
        } 
      });
    };

    return (
        <div className="enquiry-container">
          {isLoggedIn ?
          <div className="row balance-header">
            <div className="col-2 p2 home-heading">
              <h4>Enquiry</h4>
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
            <div className="mt-4 form-group enquiry-div">
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control email-input"
                    id="emailInput2"
                    value={email}
                    onChange={handleEmailChange}
                />

                <label className='mt-3'>Enquiry:</label>
                <textarea
                    className="form-control enquiry-input"
                    value={enquiry}
                    onChange={handleEnquiryChange}
                />
                <button className='btn btn-primary mt-4 enquiry-btn' onClick={handleEnquiry}>Send</button>
            </div>
            <div className="d-flex justify-content-center mt-6">
                <Link to={customService ? '/schedule' : '/payment'} className="btn btn-secondary">
                    Back
                </Link>
            </div>
        </div>
    );
};

export default EnquiryPage;
