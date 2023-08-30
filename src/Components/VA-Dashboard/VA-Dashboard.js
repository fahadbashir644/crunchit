import React, { useState, useEffect } from 'react';
import UserList from '../User-List/User-List';
import ChatWindow from '../Chat-Window/Chat-Window';
import './VA-Dashboard.css';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

const VaDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {balance, setBalance, email} = useHireContext();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true); 
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [highlightedSender, setHighlightedSender] = useState(null);
  const [projects, setProjects] = useState([
    { name: 'Project 1', date: 'July 1, 2023', status: 'Completed' },
    { name: 'Project 2', date: 'June 15, 2023', status: 'In Progress' },
    // Add more projects as needed
  ]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const toggleHistory = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  useEffect(() => {
      const data = {
        email: email,
      };
      axios.post("http://localhost:8000/getAvailability", data).then((res) => {   
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
      isVa: false,
    };
    axios.post("http://localhost:8000/getUsers", data).then((res) => {   
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

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setNewMessageAlert(false);
    setHighlightedSender(null); 
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    const data = {
      email: email,
      available: !isAvailable,
    };
    axios.post("http://localhost:8000/changeAvailability", data).then((res) => {   
      if (res) {
      } 
    });
  };

  return (
        <div className="dashboard">
          <div className="container">
          <div className="row">
            <div className="col-md-3">
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
            </div>
            <div className="row">
                <div className={`col-md-3 customer-history ${isHistoryExpanded ? 'expanded' : ''}`}>
                  <button className="btn btn-primary mb-4" onClick={toggleHistory}>
                    {isHistoryExpanded ? 'Hide History' : 'Show History'}
                  </button>
                  {isHistoryExpanded && (
                    <ul className="list-group">
                      {projects.map((project, index) => (
                        <li className="list-group-item" key={index}>
                        <div className="project-info">
                          <span className="project-name">{project.name}</span>
                          <span className={`project-status ${project.status.toLowerCase()}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="project-date">Date: {project.date}</div>
                      </li>
                      ))}
                    </ul>
                  )}
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
