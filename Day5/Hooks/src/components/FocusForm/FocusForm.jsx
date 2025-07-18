import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.75rem;
  margin: 1rem 0;
  border: 10px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #4CAF50;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function FocusForm() {
    const inputRef = useRef(null);
    const secondInputRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus(); // Auto focus
    }, []);

    const handleClick = () => {
        alert(`Button clicked! Input value: ${inputRef.current.value}, Second Input: ${secondInputRef.current.value}`);
        buttonRef.current.style.backgroundColor = '#e63939'; // Change button color on click
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Input ref={inputRef} placeholder="Type username here" />
            <Input ref={secondInputRef} placeholder="Type email here" />
            <Button ref={buttonRef} onClick={handleClick}>Submit</Button>
        </div>
    );
}

export default FocusForm; 