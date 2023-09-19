import React, { useState, useEffect } from 'react';
import UserList from '../User-List/User-List';
import ChatWindow from '../Chat-Window/Chat-Window';
import './VA-Dashboard.css';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import { useAuth } from '../Auth/Auth';

const VaDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {balance, setBalance, email} = useHireContext();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true); 
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [highlightedSender, setHighlightedSender] = useState(null);
  const {isLoggedIn} = useAuth();
  const [currentSessionStartTime, setCurrentSessionStartTime] = useState(null);

  // State for the countdown time (remaining time)
  const [countdownTime, setCountdownTime] = useState(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
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
      axios.post("http://137.184.81.218:8000/getSubscriptionsOfVa", data).then((res) => {   
        if (res) {
          setActiveSubscriptions(res.data.subscriptions);
        } 
      }).catch((err) => {
        console.log(err);
      });
    }
  },[]);

  useEffect(() => {
    if (currentSessionStartTime != null && currentSessionStartTime >= 0) {
      const interval = 1000;
      const timer = setInterval(() => {
        let now = new Date();
        now =  now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
        let endTime = currentSessionStartTime + (60*60);
        let timeRemaining = endTime - now;
        timeRemaining = timeRemaining * 1000;
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
  const startWorkingSession = (hours) => {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    let sessionStartTime = hours[currentDate]?.find((time) => currentTime-(time*3600) >= 0 && currentTime-(time*3600) <= 3600);
    if (sessionStartTime != null && sessionStartTime >= 0) {
      sessionStartTime = sessionStartTime * 60 * 60;
      setCurrentSessionStartTime(sessionStartTime);
    } else {
      setCountdownTime(null);
      setCurrentSessionStartTime(null);
    }
  };

  useEffect(() => {
      const data = {
        email: email,
      };
      axios.post("http://137.184.81.218:8000/getAvailability", data).then((res) => {   
        if (res) {
          setIsAvailable(res.data.available);
        } 
      });
  }, []);

  useEffect(() => {
    if(newMessageAlert) {
      toast.info(`New message from ${highlightedSender.name}`, {
        autoClose: 3000,
      });
    }
  }, [newMessageAlert, highlightedSender]);

  useEffect(() => {
    const data = {
      va: email,
    };
    axios.post("http://137.184.81.218:8000/getRelatedUsers", data).then((res) => {   
      if (res) {
          setUsers(res.data.users);
      } 
    });
  }, []);

  useEffect(() => {
    const newSocket = io('http://137.184.81.218:8000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setNewMessageAlert(false);
    setHighlightedSender(null); 
    let currentUser = users.find((item) => item._id === userId);
    let currentSub = activeSubscriptions.find((item) => item.client === currentUser?.email);
    if (currentSub) {
      startWorkingSession(currentSub['workingHours']);
    }
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    const data = {
      email: email,
      available: !isAvailable,
    };
    axios.post("http://137.184.81.218:8000/changeAvailability", data).then((res) => {   
      if (res) {
      } 
    });
  };

  return (
        <div className="dashboard">
          <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="availability-section">
                <div className="availability-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={handleToggleAvailability}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className={`availability-status ${isAvailable ? 'available' : 'unavailable'}`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <div className="balance-topup">
                  <div className="current-balance">
                    <p>Current Balance: ${balance}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="countdown-timer">
              {countdownTime && (
                <div className='timer'>
                  <p>Time Remaining:</p>
                  <p>{formatCountdownTime(countdownTime)}</p>
                </div>
              )}
              </div>
            </div>
            </div>
            <div className="row mt-8 va-chat p-4">
            <div className="col-md-3">
              <UserList users={users} handleUserClick={handleUserClick}
               highlightedSender={highlightedSender} />
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

export default VaDashboard;
