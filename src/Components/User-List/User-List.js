import React from 'react';

const UserList = ({ users, handleUserClick, highlightedSender }) => {
  return (
    <div className="user-list">
      <ul className="list-group" style={{ width: '100% '}}>
        {users.map((user) => (
          // <li
          //   style={{ border: '1px solid #222', backgroundColor: highlightedSender === user.name ? '#ffc107' : 'transparent' }}
          //   key={user._id}
          //   className={`list-group-item ${highlightedSender === user.name ? 'highlighted' : ''}`}
          //   onClick={() => handleUserClick(user._id)}
          // >
          <li
            style={{ border: '1px solid #222'}}
            key={user._id}
            className={`list-group-item`}
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
