import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaShoppingCart, FaUserEdit, FaPalette, FaSyncAlt, FaMoneyBillWave } from 'react-icons/fa';
import Cart from './components/Cart/Cart'
import './App.css'
import FocusForm from './components/FocusForm/FocusForm';
import ThemeExample from './components/ThemeExample/ThemeExample';
import UseEffectDemo from './components/UseEffectDemo/UseEffectDemo';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import HigherOrderDemo from './components/HigherOrderDemo/HigherOrderDemo';
import CartComparisonDemo from './components/CartComparisonDemo/CartComparisonDemo';

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7em;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px rgba(80, 80, 120, 0.08);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  margin: 0.7rem 0;
  border: none;
  outline: none;

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 24px rgba(80, 80, 120, 0.15);
    background: linear-gradient(135deg, #a777e3, #6e8efb);
  }
`;

const MainContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  min-width: 100vw;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  color: #2d2d4d;
  margin-bottom: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px rgba(80, 80, 120, 0.08);
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1.5rem 0 0.5rem 0;
  color: #888;
  font-size: 1rem;
  text-align: center;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <MainContainer>
        <Header>Welcome to Our Shop</Header>
        <NavButton to="/cart"><FaShoppingCart />View Cart</NavButton>
        <NavButton to="/focus-form"><FaUserEdit />Go to Focus Form</NavButton>
        <NavButton to="/theme-example"><FaPalette />Explore Theme Example</NavButton>
        <NavButton to="/use-effect-demo"><FaSyncAlt />UseEffect Demo</NavButton>
        <NavButton to="/currency-converter"><FaMoneyBillWave />Currency Converter</NavButton>
        <NavButton to="/hoc-demo">HOC Demo</NavButton>
        <NavButton to="/cart-comparison">Cart Memo Comparison</NavButton>

        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/focus-form" element={<FocusForm />} />
          <Route path="/theme-example" element={<ThemeExample />} />
          <Route path="/use-effect-demo" element={<UseEffectDemo />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/hoc-demo" element={<HigherOrderDemo />} />
          <Route path="/cart-comparison" element={<CartComparisonDemo />} />
        </Routes>

      </MainContainer>
    </Router>
  )
}

export default App
