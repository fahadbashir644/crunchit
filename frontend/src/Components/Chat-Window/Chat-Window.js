import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHireContext } from '../../App.js';
import './Chat-Window.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatWindow = ({ setCountdownTime, selectedUser, setSelectedUser, socket, setHighlightedSender, setNewMessageAlert,  activeSubscriptions, setActiveSubscriptions }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const { email, isVa } = useHireContext();
  const chatMessagesRef = useRef(null);
  const toggleDetailsButtonText = !isExpanded ? 'Hide Details' : 'Show Details';

  useEffect(() => {
    if (selectedUser) {
      const data = {
        sender: email,
        receiver: selectedUser.email
      };
      axios.post('http://16.171.177.188:8088/getMessages', data)
        .then(response => {
          setChatMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching chat history:', error);
        });
        if (isVa) {
          setCurrentSubscription(activeSubscriptions?.find((item) => item.client === selectedUser?.email))
        } else {
          setCurrentSubscription(activeSubscriptions?.find((item) => item.va === selectedUser?.email))
        }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      socket.on('privateMessage', newMessage => {
        if (newMessage.sender === selectedUser.email) {
          setChatMessages([...chatMessages, newMessage]);
          setHighlightedSender(selectedUser);
          setNewMessageAlert(true);
        }
      });
    }
  }, [chatMessages]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

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

  useEffect(() => {
    // Scroll to the bottom of the chat messages container
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleCompleteClick = () => {
    if (currentSubscription) {
      const confirmation = window.confirm('Are you sure you want to complete this project?');
      if (confirmation) {
        const data = {
          va: currentSubscription.va,
          _id: currentSubscription._id,
          vaRate: selectedUser.vaRate,
          workingHours: currentSubscription.totalHours,
          balance: selectedUser.balance
        };
        axios.post('http://16.171.177.188:8088/completeProject', data)
          .then(response => {
            setActiveSubscriptions(response.data.subscriptions);
            setSelectedUser(null);
            setCountdownTime(null);
            toast.success('Subscription successfully completed');
          })
          .catch(error => {
            console.error('Error fetching chat history:', error);
          });
      }
    }
  };

  return (
    <>
    <div className='chat-window'>
      <div className={`chat-content ${isExpanded ? 'expanded' : ''}`}>
      <div className="chat-header mb-4">
        <h5>{selectedUser.name}</h5>
        <button onClick={handleExpandClick} className="btn btn-primary">{toggleDetailsButtonText}</button>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
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
      {!isExpanded && (
        <div className="additional-info">
          <div className='mb-3'>Service: {currentSubscription?.service}</div>
          <div>Total Price: ${currentSubscription?.fee}</div>
          {selectedUser.isVa ? 
          <button onClick={handleCompleteClick} className="btn btn-primary mt-4">Complete</button> : ''}
        </div>
      )}
    </div>
    </>
  );
};

export default ChatWindow;
