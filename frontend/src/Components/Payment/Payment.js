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
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
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
    selectedTimezone
    } = useHireContext();

  useEffect(() => {
    if(isLoggedIn) {
      const data = {
        email: email,
      };
      axios.post("http://16.171.177.188:8000/getbalance", data).then((res) => {   
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
        setNewEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePayClick = () => {
      if (newEmail === '' || password === '') {
        toast.error('Please Enter All Fields');
        return;
      }
      setIsLoading(true);
        if (totalPrice <= balance) {
          axios
          .post("http://16.171.177.188:8000/login", {
            header: { "Content-Type": "application/json" },
            data: {
              email: newEmail,
              password: password,
            },
          })
          .then((response) => {
            let hours = {};
          workingHours.forEach((value,key) => {
            hours[key] = value;
          });
          const data = {
            email: email,
            price: totalPrice,
            selectedService: selectedService.name ?? customService,
            totalHours: totalHours,
            workingHours: hours,
            timezone: selectedTimezone?.value
          };
          axios.post("http://16.171.177.188:8000/pay", data).then((res) => {   
            if (res) {
                setIsLoading(false);
                toast.success('Payment Successful');
                setTotalPrice(0);
                setWorkingHours(new Map());
                setSelectedService('');
                setCustomService('');
                setBalance(res.data.balance);
                navigate(customService ? '/enquiry' : '/purchase');
            } else {
              setIsLoading(false);
              toast.error('Payment failed');
            }
          });
          }).catch((error) => {
            if (error.response.status === 400) {
              setIsLoading(false);
              toast.error("Incorrect Email/Password");
            } else {
              setIsLoading(false);
              toast.error("Email does not exists");
            }
          });
        } else {
          toast.error('You do not have enough balance');
        }
    };
  return (
    <div className="summary-container">
      {isLoggedIn ? 
      <div className="row balance-header">
        <div className="col-2 p2 home-heading">
          <h4>Make Payment</h4>
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
      </div>
      : ''}
        <div className="mt-4 form-group payment-div">
          <div>
              <label>Email:</label>
              <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  value={newEmail}
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
            {isLoading ? (
              <div className="mt-4 p-4 spinner-border" role="status">
            </div>):
              <button className='btn btn-primary mt-4' onClick={handlePayClick}>Pay</button>
            }
        </div>
        <div className="d-flex justify-content-center mt-6">
          <Link to='/summary' className="btn btn-secondary">Back</Link>
        </div>
    </div>
  );
};

export default PaymentPage;
