// LifeCycleWithHooks.js

import React, { useState, useEffect } from 'react';
import './LifeCycleWithHooks.css';

function LifeCycleWithHooks() {
    const [count, setCount] = useState(0);
    const [showFourth, setShowFourth] = useState(false);
    const [message, setMessage] = useState('');

    // Mounting - only once
    useEffect(() => {
        console.log("✅ componentDidMount - Functional component mounted");
        return () => {
            console.log("❌ componentWillUnmount - Functional component cleanup");
        };
    }, []);

    // Updating - every time count changes
    useEffect(() => {
        if (count > 0) {
            console.log("🔄 componentDidUpdate - Count updated");
        }
    }, [count]);
 
    // Fourth component effect
    useEffect(() => {
        if (showFourth) {
            setMessage('Fourth Component is Active! 🎉');
        } else {
            setMessage('');
        }
    }, [showFourth]);

    // Fourth component render
    const FourthComponent = () => (
        <div className="fourth-component">
            <h3>🌟 Fourth Component</h3>
            <p>{message}</p>
            <div className="animation-box">
                <div className="pulse-circle"></div>
                <span>Active</span>
            </div>
        </div>
    );

    return (
        <div className="hook-lifecycle-container">
            <div className="hook-lifecycle-box">
                <h2>⚙ Hooks Lifecycle Demo</h2>
                <p>🧮 Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Click Me</button>
            </div>

            <div className="fourth-toggle-section">
                <button
                    className="fourth-toggle-btn"
                    onClick={() => setShowFourth(!showFourth)}
                >
                    {showFourth ? 'Hide Fourth Component' : 'Show Fourth Component'}
                </button>
                {showFourth && <FourthComponent />}
            </div>
        </div>
    );
}

export default LifeCycleWithHooks;
