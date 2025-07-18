import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  color: #333;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RemoveButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e63939;
  }
`;

const CartTitle = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
`;

const CartItem = React.memo(({ item, onRemove }) => {
    return (
        <CartItemContainer>
            <div>
                <strong>{item.name}</strong> - ₹{item.price}
            </div>
            <RemoveButton onClick={() => onRemove(item.id)}>Remove</RemoveButton>
        </CartItemContainer>
    );
});

function Cart() {
    const [cart, setCart] = useState([
        { id: 1, name: 'Mouse', price: 500 },
        { id: 2, name: 'Keyboard', price: 700 },
        { id: 3, name: 'Monitor', price: 15000 },
        { id: 4, name: 'Headphones', price: 1200 },
        { id: 5, name: 'Earphones', price: 1400 }
    ]);

    // useCallback is used to memoize the removeItem function
    // This prevents the function from being recreated on every render
    const removeItem = useCallback((id) => {
        console.log('removeItem function is called');
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    // useMemo is used to memoize the total calculation
    // This prevents recalculating the total unless the cart changes
    const total = useMemo(() => {
        console.log('Calculating total');
        return cart.reduce((sum, item) => sum + item.price, 0);
    }, [cart]);

    console.log('Cart component is rendering');

    return (
        <CartContainer>
            <CartTitle>Shopping Cart</CartTitle>
            {cart.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
            <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold' }}>
                Total: ₹{total}
            </div>
        </CartContainer>
    );
}

export default Cart; 