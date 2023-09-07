// VAList.js
import React from 'react';

const VAList = ({ users, handleUserClick }) => {
  return (
    <div className="user-list">
      <ul className="list-group">
        {users.map((user) => (
          <li
            style={{ border: '1px solid #222' }}
            key={user.id}
            className="list-group-item"
            onClick={() => handleUserClick(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VAList;
