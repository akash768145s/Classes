// TextInput.js

import React, { useState } from 'react';
import './TamilGreetings.css';

function TextInput() {
  const [text, setText] = useState("");

  const handleInput = (e) => {
    setText(e.target.value); // user type panna text update
  };

  return (
    <div className="text-input-container">
      <div className="input-group">
        <input
          type="text"
          className="tamil-input"
          placeholder="Unga peru ezhudhunga..."
          onChange={handleInput}
          value={text}
        />
      </div>
      {text && (
        <p className="live-greeting-text">
          Vanakkam, {text} 🌟
        </p>
      )}
    </div>
  );
}

export default TextInput;
