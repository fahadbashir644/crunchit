import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHireContext } from '../../App.js';
import './Chat-Window.css';

const ChatWindow = ({ selectedUser, socket }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const {
    email
   } = useHireContext();

   useEffect(() => {
    if (selectedUser) {
      const data = {
        sender: email,
        receiver: selectedUser.email
      };
      axios.post('http://localhost:8000/getMessages', data)
        .then(response => {
          setChatMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching chat history:', error);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    console.log('out');
    if (selectedUser) {
      console.log('asd');
      socket.on('privateMessage', newMessage => {
        console.log(newMessage.sender);
        console.log(selectedUser.email);
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
    <div className="chat-window">
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
      <input
        type="text"
        className="form-control"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  </div>
);
};

export default ChatWindow;
