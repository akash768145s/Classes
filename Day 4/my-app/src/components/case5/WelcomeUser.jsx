// WelcomeUser.js

import React, { useState } from 'react';
import './TamilGreetings.css';

function WelcomeUser() {
    const [name, setName] = useState("");
    const [greet, setGreet] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleGreet = () => {
        if (name.trim()) {
            setGreet(`Vanakkam, ${name}! 👋`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleGreet();
        }
    };

    return (
        <div className="welcome-container">
            <div className="input-group">
                <input
                    type="text"
                    className="tamil-input"
                    placeholder="Unga peru?"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    value={name}
                />
                <button
                    className="tamil-button"
                    onClick={handleGreet}
                >
                    Greet
                </button>
            </div>
            {greet && <p className="greeting-text">{greet}</p>}
        </div>
    );
}

export default WelcomeUser;
