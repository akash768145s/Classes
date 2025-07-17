// UserList.jsx

import React from 'react';
import UserCard from './usercard.jsx';
import './UserCard.css';

function UserList() {
    return (
        <div className="user-card-container">
            <h1>👥 User List</h1>
            <UserCard name="Sudharshan" email="sathya@email.com" location="Chennai" />
            <UserCard name="Vithula" email="priya@email.com" location="Madurai" />
            <UserCard name="Akash" email="raj@email.com" location="Coimbatore" />
          
        </div>
    );
}

export default UserList; 