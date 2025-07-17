// CounterList.jsx

import React from 'react';
import CounterCard from './CounterCard.jsx';
import './CounterCard.css';

function CounterList() {
    return (
        <div className="counter-container">
            <h1>🧪 Props vs State Demo</h1>
            <CounterCard name="Sudharshan" />
            <CounterCard name="Vithula" />
            <CounterCard name="Akash" />
        </div>
    );
}

export default CounterList; 