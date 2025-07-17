// LifeCycleDemo.js

import React, { Component } from 'react';

class LifeCycleDemo extends Component {
    constructor(props) {
        super(props);
        // State create pannrom
        this.state = {
            count: 0
        };
        console.log("📦 constructor - Initial setup");
    }

    // Mounting stage - component screen-la varumbothu
    componentDidMount() {
        console.log("✅ componentDidMount - Component render aagiduchu");
    }

    // Updating stage - state update aagumbothu
    componentDidUpdate(prevProps, prevState) {
        console.log("🔄 componentDidUpdate - State or props maari update aayiduchu");
    }

    // Unmounting stage - component remove panna
    componentWillUnmount() {
        console.log("❌ componentWillUnmount - Component remove aagiduchu");
    }

    // Click panni state maathura function
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div className="lifecycle-box">
                <h2>🔁 Lifecycle Demo</h2>
                <p>🧮 Count: {this.state.count}</p>
                <button onClick={this.increment}>Click Me</button>
            </div>
        );
    }
}

export default LifeCycleDemo;
