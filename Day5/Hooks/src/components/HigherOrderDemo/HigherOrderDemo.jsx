import React, { useState } from 'react';
import styled from 'styled-components';

// Higher Order Component
function withCounter(WrappedComponent) {
    return function WithCounter(props) {
        const [count, setCount] = useState(0);
        const increment = () => setCount(count + 1);
        return <WrappedComponent count={count} increment={increment} {...props} />;
    };
}

// Demo 1: Button that uses the counter
function ClickCounter({ count, increment }) {
    return (
        <DemoCard>
            <h3>Click Counter (HOC)</h3>
            <StyledButton onClick={increment}>Clicked {count} times</StyledButton>
        </DemoCard>
    );
}

// Demo 2: Hover area that uses the counter
function HoverCounter({ count, increment }) {
    return (
        <DemoCard>
            <h3>Hover Counter (HOC)</h3>
            <HoverBox onMouseOver={increment}>
                Hovered {count} times
            </HoverBox>
        </DemoCard>
    );
}

const EnhancedClickCounter = withCounter(ClickCounter);
const EnhancedHoverCounter = withCounter(HoverCounter);

export default function HigherOrderDemo() {
    return (
        <HOCContainer>
            <h2>Higher Order Components (HOC) Demo</h2>
            <p style={{ maxWidth: 500, margin: '0 auto 2rem', color: '#444' }}>
                A <b>Higher Order Component</b> is a function that takes a component and returns a new component with extra props or logic. Here, <code>withCounter</code> adds counter logic to any component!
            </p>
            <DemoRow>
                <EnhancedClickCounter />
                <EnhancedHoverCounter />
            </DemoRow>
        </HOCContainer>
    );
}

const HOCContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(80, 80, 120, 0.08);
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const DemoRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const DemoCard = styled.div`
  background: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(80, 80, 120, 0.06);
  padding: 1.5rem 1rem;
  min-width: 220px;
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(135deg, #a777e3, #6e8efb);
    transform: scale(1.05);
  }
`;

const HoverBox = styled.div`
  background: #e0e7ff;
  color: #2d2d4d;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #c3cfe2;
    transform: scale(1.05);
  }
`; 