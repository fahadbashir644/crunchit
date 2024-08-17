import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHireContext } from '../../App.js';
import './Chat-Window.css';

const ChatWindow = ({ selectedUser, socket }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { email } = useHireContext();

  useEffect(() => {
    if (selectedUser) {
      const data = {
        sender: email,
        receiver: selectedUser.email,
      };
      axios
        .post('http://16.171.177.188:8088/getMessages', data)
        .then((response) => {
          setChatMessages(response.data);
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      socket.on('privateMessage', (newMessage) => {
        if (newMessage.sender === selectedUser.email) {
          // Update chat history only if the message is from the selected user
          setChatMessages([...chatMessages, newMessage]);
        }
      });
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', {
        sender: email,
        receiver: selectedUser.email,
        text: message,
      });
      setChatMessages([...chatMessages, { sender: email, text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-window container">
      <div className="chat-header mb-4">
        <h5>Chat with {selectedUser.name}</h5>
      </div>
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`message-container ${
              message.sender === email ? 'sent' : 'received'
            }`}
          >
            <div className="message">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <button
          className="btn btn-primary btn-block mb-2"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
