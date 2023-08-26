import React, { useState, useEffect } from 'react';
import VAList from './VA-List';
import ChatWindow from './Chat-Window';
import './VA-Dashboard.css';
import { useHireContext } from '../../App.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/Auth';
import io from 'socket.io-client';

const VaDashboard = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const {
           email
          } = useHireContext();
    const [users] = useState([
      { id: 1, name: 'abc' , email: 'abc@gmail.com'},
      // Add more users as needed
    ]);
    const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // Fetch messages for the selected user from the backend or state
    // and update the "messages" state
  };

  return (
        <div className="dashboard">
          <div className="container">
            <div className="row mt-8 va-chat p-4">
            <div className="col-md-3">
              <VAList users={users} handleUserClick={handleUserClick} />
            </div>
            <div className="col-md-9">
              <div className="chat-container">
                {selectedUserId ? (
                  <ChatWindow
                    selectedUser={users.find((user) => user.id === selectedUserId)}
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
