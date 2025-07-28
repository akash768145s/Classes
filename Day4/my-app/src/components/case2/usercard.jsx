// UserCard.jsx

import React from 'react';
import './UserCard.css';

// Functional component — easiest and modern way
function UserCard(props) {
    return (
        <div className="user-card">
            <h2>👤 {props.name}</h2>
            <p className="email">📧 {props.email}</p>
            <p className="location">📍 Location: {props.location}</p>
        </div>
    );
}

export default UserCard; 