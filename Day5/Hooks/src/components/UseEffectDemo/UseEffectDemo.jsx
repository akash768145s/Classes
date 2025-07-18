import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function UseEffectDemo() {
  const [count, setCount] = useState(20);
  const [id, setId] = useState(1);
  const [infiniteLogs, setInfiniteLogs] = useState([]);
  const [onceLogs, setOnceLogs] = useState([]);
  const [idLogs, setIdLogs] = useState([]);

  // Without dependency array
  useEffect(() => {
    const message = 'Effect without dependency array: Runs on every render';
    setInfiniteLogs((prev) => [...prev, message]);
  });

  // With empty dependency array
  useEffect(() => {
    const message = 'Effect with empty dependency array: Runs once after initial render';
    setOnceLogs((prev) => [...prev, message]);
  }, []);

  // With a changing dependency
  useEffect(() => {
    const message = `Effect with id as dependency: Runs when id changes to ${id}`;
    setIdLogs((prev) => [...prev, message]);
  }, [id]);

  return (
    <FullScreenContainer>
      <h2 style={{ color: '#000' }}>useEffect Demo</h2>
      <p style={{ color: '#000' }}>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment Count</Button>
      <p style={{ color: '#000' }}>ID: {id}</p>
      <Button onClick={() => setId(id + 1)}>Change ID</Button>
      <LogSections>
        <LogContainer>
          <h3 style={{ color: '#000' }}>Infinite Render Effect (no dependency array)</h3>
          {infiniteLogs.map((log, index) => (
            <LogEntry key={index}>{log}</LogEntry>
          ))}
        </LogContainer>
        <LogContainer>
          <h3 style={{ color: '#000' }}>Once on Mount Effect (empty dependency array)</h3>
          {onceLogs.map((log, index) => (
            <LogEntry key={index}>{log}</LogEntry>
          ))}
        </LogContainer>
        <LogContainer>
          <h3 style={{ color: '#000' }}>[id] Dependency Effect</h3>
          {idLogs.map((log, index) => (
            <LogEntry key={index}>{log}</LogEntry>
          ))}
        </LogContainer>
      </LogSections>
    </FullScreenContainer>
  );
}

const FullScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 2rem;
  color: #000;
`;

const LogSections = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
`;

const LogContainer = styled.div`
  width: 320px;
  background-color: #fff;
  color: #000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: auto;
  max-height: 240px;
`;

const LogEntry = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  color: #000;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default UseEffectDemo; 