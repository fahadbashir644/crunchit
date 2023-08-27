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
    const {balance, setBalance} = useHireContext();
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);

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
                </div>
            </div>
            </div>
            <div className="row mt-8 va-chat p-4">
            <div className="col-md-3">
              <UserList users={users} handleUserClick={handleUserClick} />
            </div>
            <div className="col-md-9">
              <div className="chat-container">
                {selectedUserId ? (
                  <ChatWindow
                    selectedUser={users.find((user) => user._id === selectedUserId)}
                    socket={socket}
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
