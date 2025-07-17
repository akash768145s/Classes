// OldUserCard.jsx

import React, { Component } from 'react';

class OldUserCard extends Component {
    render() {
        return (
            <div className="user-card">
                <h2>👤 {this.props.name}</h2>
                <p>📧 {this.props.email}</p>
                <p>📍 Location: {this.props.location}</p>
            </div>
        );
    }
}

export default OldUserCard; 