import React, {useState, useEffect, useMemo} from 'react';
import './Payment.css';
import {Link} from 'react-router-dom';
import { useHireContext } from '../../App.js';
import { useAuth } from '../Auth/Auth';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [password, setPassword] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();
  const {balance, 
    setBalance,
    email,
    setEmail,
    totalPrice,
    workingHours,
    setWorkingHours,
    selectedService,
    setSelectedService,
    customService,
    setCustomService,
    setTotalPrice,
    } = useHireContext();

  useEffect(() => {
    if(isLoggedIn) {
      const data = {
        email: email,
      };
      axios.post("http://137.184.81.218:8000/getbalance", data).then((res) => {   
        if (res) {
            setBalance(res.data.balance);
        } 
      });
    }
  });

  const totalHours = useMemo(() => {
    const selectedHours = Array.from(workingHours.values()).flat();
    return selectedHours.length;
  }, [workingHours]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePayClick = () => {
        if (totalPrice <= balance) {
        let hours = {};
          workingHours.forEach((value,key) => {
            hours[key] = value;
          });
          const data = {
            email: email,
            price: totalPrice,
            selectedService: selectedService ?? customService,
            totalHours: totalHours,
            workingHours: hours
          };
          axios.post("http://137.184.81.218:8000/pay", data).then((res) => {   
            if (res) {
                toast.success('Payment Successful');
                setTotalPrice(0);
                setWorkingHours(new Map());
                setSelectedService('');
                setCustomService('');
                navigate('/enquiry');
            } else {
              toast.error('Payment failed');
            }
          });
        } else {
          toast.error('You do not have enough balance');
        }
    };
  return (
    <div className="summary-container">
        <h2 className='cstm-h2'>Make Payment</h2>
        <div className="mt-4 form-group payment-div">
          <div>
              <label>Email:</label>
              <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  value={email}
                  onChange={handleEmailChange}
              />
            </div>
            <div>
              <label className='mt-4'>Password:</label>
              <input
                  type="password"
                  className="form-control"
                  id="emailInput"
                  value={password}
                  onChange={handlePasswordChange}
              />
            </div>
              <button className='btn btn-primary mt-4' onClick={handlePayClick}>Pay</button>
        </div>
        <div className="d-flex justify-content-center mt-6">
          <Link to='/summary' className="btn btn-secondary">Back</Link>
          <Link to='/enquiry' className="btn btn-primary">Next</Link>
        </div>
    </div>
  );
};

export default PaymentPage;
