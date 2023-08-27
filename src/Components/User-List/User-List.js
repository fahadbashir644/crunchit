import React from 'react';

const UserList = ({ users, handleUserClick }) => {
  return (
    <div className="user-list">
      <ul className="list-group">
        {users.map((user) => (
          <li
            style={{ border: '1px solid #222' }}
            key={user._id}
            className="list-group-item"
            onClick={() => handleUserClick(user._id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
