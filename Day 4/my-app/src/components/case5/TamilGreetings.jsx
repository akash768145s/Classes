import React from 'react';
import WelcomeUser from './WelcomeUser';
import TextInput from './TextInput';
import './TamilGreetings.css';

function TamilGreetings() {
    return (
        <div className="tamil-container">
            <div className="tamil-header">
                <h1>🌺 தமிழ் வரவேற்பு 🌺</h1>
                <p className="subtitle">Tamil Greetings Demo</p>
            </div>

            <div className="greeting-section">
                <div className="greeting-card">
                    <h2>✨ Welcome Greetings</h2>
                    <WelcomeUser />
                </div>

                <div className="greeting-card">
                    <h2>💫 Live Greetings</h2>
                    <TextInput />
                </div>
            </div>

            <div className="tamil-footer">
                <p>நன்றி! (Thank You!)</p>
            </div>
        </div>
    );
}

export default TamilGreetings; 