import React, { useState, useEffect } from 'react';
import VAList from './VA-List';
import ChatWindow from './Chat-Window';
import './Customer-Dashboard.css';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/Auth';

const CustomerDashboard = () => {
    const [topup, setTopup] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const {balance, 
           setBalance,
           email
          } = useHireContext();
  const [users] = useState([
    { id: 1, name: 'VA 1' },
    { id: 2, name: 'VA 2' },
    { id: 3, name: 'VA 3' },
    // Add more users as needed
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      const data = {
        email: email,
      };
      axios.post("http://localhost:8000/getbalance", data).then((res) => {   
        if (res) {
            setBalance(res.data.balance);
        } 
      });
    }
  });

  const handleTopupChange = (event) => {
    setTopup(event.target.value);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // Fetch messages for the selected user from the backend or state
    // and update the "messages" state
  };

  const handleTopUp = () => {
        axios.post("http://localhost:8000/topup", {
        header: { "Content-Type": "application/json" },
        data : JSON.stringify({
            price_amount: topup,
            price_currency: "usd",
            email: email,
            ipn_callback_url: "https://nowpayments.io",
            success_url: "https://nowpayments.io",
            cancel_url: "https://nowpayments.io"
            })
        })
        .then((response) => {
            if (response) {
                let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=500,height=500`;
                window.open(response.data.invoice_url, "test", params);
            }
        }).catch((error) => {
          toast.error("Error occurred while topup");
        });
  };

  return (
        <div className="dashboard">
          <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="balance-topup">
                <div className="current-balance">
                    Current Balance: ${balance}
                </div>
                <div className="mt-4 form-group">
                    <label >Add Balance:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="topupInput"
                        value={topup}
                        style={{width: "50%"}}
                        onChange={handleTopupChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleTopUp}>
                    Top Up
                </button>
                </div>
            </div>
            </div>
            <div className="row mt-8 va-chat p-4">
                <h4 style={{color: "rgb(114 114 114)"}}>Your subscribed VAs</h4>
              <div className="col-md-3">
                <VAList users={users} handleUserClick={handleUserClick} />
              </div>
              <div className="col-md-9">
                <div className="chat-container">
                  {selectedUserId ? (
                    <ChatWindow
                      selectedUser={users.find(user => user.id === selectedUserId)}
                      messages={messages}
                    />
                  ) : (
                    <p>Select a user to start chatting</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default CustomerDashboard;
