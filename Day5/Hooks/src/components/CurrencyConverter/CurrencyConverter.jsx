import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => setCurrencies(Object.keys(data)));
  }, []);

  const handleConvert = () => {
    if (fromCurrency === toCurrency) {
      alert('Choose different currencies');
      return;
    }
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(res => res.json())
      .then(data => setResult(Object.values(data.rates)[0]));
  };

  return (
    <ConverterContainer>
      <h2>Currency Converter</h2>
      <Select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
        <option value="">Select currency</option>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </Select>
      <Select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
        <option value="">Select currency</option>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </Select>
      <Input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Button onClick={handleConvert}>Convert</Button>
      {result && <Result>Converted Amount: {result}</Result>}
    </ConverterContainer>
  );
}

const ConverterContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Select = styled.select`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 1rem;
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

const Result = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default CurrencyConverter; 