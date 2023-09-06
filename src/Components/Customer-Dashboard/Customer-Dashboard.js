import React, { useState, useEffect } from 'react';
import UserList from '../User-List/User-List';
import ChatWindow from '../Chat-Window/Chat-Window';
import './Customer-Dashboard.css';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/Auth';
import io from 'socket.io-client';

const CustomerDashboard = () => {
    const [topup, setTopup] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const {isLoggedIn} = useAuth();
    const {balance, 
           setBalance,
           email
          } = useHireContext();
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [newMessageAlert, setNewMessageAlert] = useState(false);
    const [highlightedSender, setHighlightedSender] = useState(null);
    const [currentSessionStartTime, setCurrentSessionStartTime] = useState(null);

    // State for the countdown time (remaining time)
    const [countdownTime, setCountdownTime] = useState(null);
    const [workingHours, setWorkingHours] = useState(new Map());
    const [activeSubscriptions, setActiveSubscriptions] = useState([]);
    // ...
    const formatCountdownTime = (timeInMillis) => {
      const minutes = Math.floor((timeInMillis / 1000) / 60);
      const seconds = Math.floor((timeInMillis / 1000) % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    useEffect(() => {
      if (isLoggedIn) {
        const data = {
          email: email,
        };
        axios.post("http://localhost:8000/getSubscriptionsOfUser", data).then((res) => {   
          if (res) {
            setActiveSubscriptions(res.data.subscriptions);
          } 
        }).catch((err) => {
          console.log(err);
        });
      }
    },[]);

    useEffect(() => {
      // ...
  
      // Initialize the timer based on the current working session
      if (currentSessionStartTime) {
        const interval = 1000; // 1 second interval
        const timer = setInterval(() => {
          const now = new Date();
          const endTime = new Date(currentSessionStartTime);
          endTime.setMinutes(endTime.getMinutes() + 30); // Assuming half-hour intervals
          const timeRemaining = endTime - now;
  
          if (timeRemaining <= 0) {
            clearInterval(timer);
            setCurrentSessionStartTime(null); // Reset the session start time
            setCountdownTime(null); // Reset the countdown time
          } else {
            setCountdownTime(timeRemaining);
          }
        }, interval);
  
        // Store the timer ID in state to clear it on unmount
        return () => clearInterval(timer);
      }
    }, [currentSessionStartTime]);
  
    // Function to start a working session
    const startWorkingSession = () => {
      const now = new Date();
      setCurrentSessionStartTime(now);
    };

    useEffect(() => {
      const data = {
        client: email,
      };
      axios.post("http://localhost:8000/getRelatedVas", data).then((res) => {   
        if (res) {
            setUsers(res.data.users);
        } 
      });
    }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if(newMessageAlert) {
      toast.info(`New message from ${highlightedSender.name}`, {
        autoClose: 3000,
      });
    }
  }, [newMessageAlert, highlightedSender]);

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
    setNewMessageAlert(false);
    setHighlightedSender(null);
    let currentVa = users.find((item) => item._id === selectedUserId);
    let currentSub = activeSubscriptions.find((item) => item.va === currentVa?.email);
    setWorkingHours(currentSub['workingHours']);
    //startWorkingSession();
  };

  const handleTopUp = () => {
        axios.post("http://localhost:8000/topup", {
        header: { "Content-Type": "application/json" },
        data : JSON.stringify({
            price_amount: topup,
            price_currency: "usd",
            order_description: email,
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
      <div className="countdown-timer">
        {countdownTime && (
          <div>
            <p>Time Remaining:</p>
            <p>{formatCountdownTime(countdownTime)}</p>
          </div>
        )}
      </div>
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
        <div className="col-md-3">
          <UserList
            users={users}
            handleUserClick={handleUserClick}
            highlightedSender={highlightedSender} // Pass the highlighted sender
          />
        </div>
        <div className="col-md-9">
          <div className="chat-container">
            {selectedUserId ? (
              <ChatWindow
                selectedUser={users.find((user) => user._id === selectedUserId)}
                socket={socket}
                setNewMessageAlert={setNewMessageAlert}
                setHighlightedSender={setHighlightedSender}
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
