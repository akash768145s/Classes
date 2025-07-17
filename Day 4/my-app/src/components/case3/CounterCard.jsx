// CounterCard.jsx

import React, { useState } from 'react';
import './CounterCard.css';

// Functional component — beginner-friendly
function CounterCard(props) {
    // state: count nu oru variable, setCount nu update function
    const [count, setCount] = useState(20); // Initial value = 0

    // Button click panna count increase panna function
    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className="counter-card">
            <h2>👋 Vanakkam, {props.name}!</h2> {/* props - parent pass panna data */}
            <div className="count-display">{count}</div> {/* state value display */}
            <p>📦 You have clicked: {count} times</p> {/* state value display */}
            <button onClick={increment}>Click me</button> {/* state update */}
        </div>
    );
}

export default CounterCard; 