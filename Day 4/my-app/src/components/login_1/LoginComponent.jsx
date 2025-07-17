import React from 'react';
import './LoginComponent.css';

// Ithu oru functional component — reusable UI part
function LoginComponent() {
    // userName-la user-oda name store pannirukom
    const userName = "Sathya";

    return (
        // JSX-la oru parent element theva — so div use pannom
        <div className="login-container">
            {/* JSX-la class keyword use panna koodathu, className nu use pannanum */}
            <h1>Vanakkam, {userName}! 👋</h1>

            {/* Simple login form with input fields */}
            <div className="form-group">
                <label htmlFor="email">Email:</label> {/* 'for' ku badhila 'htmlFor' use pannalaam */}
                <input
                    type="email"
                    id="email"
                    placeholder="Email ID podunga"
                    autoComplete="email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password podunga"
                    autoComplete="current-password"
                />
            </div>

            <button>Login</button> {/* Simple button - inga no special attribute */}
        </div>
    );
}

export default LoginComponent; 