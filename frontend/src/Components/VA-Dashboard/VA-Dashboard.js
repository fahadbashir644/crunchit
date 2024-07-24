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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {balance, setBalance, email} = useHireContext();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [highlightedSender, setHighlightedSender] = useState(null);
  const {isLoggedIn} = useAuth();
  const [sessionRemainingTime, setSessionRemainingTime] = useState(null);
  const [timeUntilSessionStart, setTimeUntilSessionStart] = useState(null);

  // State for the countdown time (remaining time)
  const [countdownTime, setCountdownTime] = useState(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const formatCountdownTime = (timeInMillis) => {
    const minutes = Math.floor((timeInMillis / 1000) / 60);
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Simulate loading for 1 second
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 1 second
    }, 1000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      const data = {
        email: email,
      };
      axios.post("http://16.171.177.188:8000/getSubscriptionsOfVa", data).then((res) => {   
        if (res) {
          setActiveSubscriptions(res.data.subscriptions);
        } 
      }).catch((err) => {
        console.log(err);
      });
    }
  },[]);

  useEffect(() => {
    if (sessionRemainingTime != null && sessionRemainingTime >= 0) {
      const interval = 1000;
      const timer = setInterval(() => {
        let now = new Date();
        now =  now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
        let endTime = sessionRemainingTime + (60*60);
        let timeRemaining = endTime - now;
        timeRemaining = timeRemaining * 1000;
        if (timeRemaining <= 0) {
          clearInterval(timer);
          setSessionRemainingTime(null); // Reset the session start time
          setCountdownTime(null); // Reset the countdown time
          let currentVa = users.find((item) => item._id === selectedUserId);
          let currentSub = activeSubscriptions.find((item) => item.va === currentVa?.email);
          if (currentSub) {
            startWorkingSession(currentSub['workingHours']);
          }
        } else {
          setCountdownTime(timeRemaining);
        }
      }, interval);

      // Store the timer ID in state to clear it on unmount
      return () => clearInterval(timer);
    }
  }, [sessionRemainingTime]);

  // Function to start a working session
  const startWorkingSession = (hours) => {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    let sessionStartTime = hours[currentDate]?.find((time) => currentTime-(time*3600) >= 0 && currentTime-(time*3600) <= 3600);
    let timeUntilSession = hours[currentDate]?.find((time) => currentTime-(time*3600) < 0);
    if (sessionStartTime != null && sessionStartTime >= 0) {
      sessionStartTime = sessionStartTime * 60 * 60;
      setSessionRemainingTime(sessionStartTime);
      setTimeUntilSessionStart(null);
    } else if (timeUntilSession != null) {
      timeUntilSession = timeUntilSession * 3600;
      setTimeUntilSessionStart(timeUntilSession);
      setSessionRemainingTime(null);
    } else {
      setCountdownTime(null);
      setSessionRemainingTime(null);
    }
  };

  useEffect(() => {
    if (timeUntilSessionStart != null) {
      const interval = 1000;
      const timer = setInterval(() => {
        let now = new Date();
        now =  now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
        let timeRemaining = timeUntilSessionStart - now;
        timeRemaining = timeRemaining * 1000;
        if (timeRemaining <= 0) {
          clearInterval(timer);
          setTimeUntilSessionStart(null); // Reset the session start time
          setCountdownTime(null); // Reset the countdown time
          let currentVa = users.find((item) => item._id === selectedUserId);
          let currentSub = activeSubscriptions.find((item) => item.va === currentVa?.email);
          if (currentSub) {
            startWorkingSession(currentSub['workingHours']);
          }
        } else {
          setCountdownTime(timeRemaining);
        }
      }, interval);

      // Store the timer ID in state to clear it on unmount
      return () => clearInterval(timer);
    }
  }, [timeUntilSessionStart]);

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
    axios.post("http://16.171.177.188:8000/getRelatedUsers", data).then((res) => {   
      if (res) {
          setUsers(res.data.users);
      } 
    });
  }, []);

  useEffect(() => {
    const newSocket = io('http://16.171.177.188:8000');
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

  return (
        <div className="dashboard">
          <div className="container">
          <div className="row balance-header">
            <div className="col-2 p2 home-heading">
              <h4>Subscriptions</h4>
            </div>
            <div className="col">
              <div className='p-2 balance-div'>
                <h5>Balance: ${balance}</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="dashboard-header mt-4">
        {/* <h3 style={{ color: 'rgb(102 99 99)' }}>Subscriptions</h3> */}
        {countdownTime && (
            <div className='timer-div'>
              {timeUntilSessionStart ? 
              <h5 style={{marginRight: '10px'}}>Time Until Session Starts:</h5> :
              <h5 style={{marginRight: '10px'}}>Time Remaining:</h5>
            }
              
              <h5>{formatCountdownTime(countdownTime)}</h5>
            </div>
        )}
      </div>
            </div>
            <div>
      {isLoading ? (
        <div className="mt-4 p-4 spinner-border" role="status">
      </div>
      ) : users?.length === 0 ? (<div className='hire-div'>
          <h5 style={{ color: 'rgb(102 99 99)' }}>No Assigned Projects</h5>
        </div>) : 
      (
        // Display the user list and chat window when users are available
        <div className="row va-chat p-4">
          <div className="col-md-3 user-list-container">
            <UserList users={users} handleUserClick={handleUserClick} highlightedSender={highlightedSender} />
          </div>
          <div className="col-md-9">
            <div className="chat-container">
              {selectedUserId ? (
                <ChatWindow
                  selectedUser={users.find((user) => user._id === selectedUserId)}
                  socket={socket}
                  activeSubscriptions={activeSubscriptions}
                  setActiveSubscriptions={setActiveSubscriptions}
                  setNewMessageAlert={setNewMessageAlert}
                  setHighlightedSender={setHighlightedSender}
                />
              ) : (
                <p>Select a user to start chatting</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
  );
};

export default VaDashboard;
