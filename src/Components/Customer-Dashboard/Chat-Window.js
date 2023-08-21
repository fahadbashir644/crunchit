import React from 'react';

const ChatWindow = ({ selectedUser, messages }) => {
  return (
    <div className="chat-window">
      <h5>Chat with {selectedUser.name}</h5>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="message-sender">{message.sender}: </span>
            {message.text}
          </div>
        ))}
      </div>
      {/* Add input and send button for sending messages */}
    </div>
  );
};

export default ChatWindow;
