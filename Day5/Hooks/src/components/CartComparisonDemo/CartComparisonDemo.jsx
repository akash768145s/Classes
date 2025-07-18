import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

// Unoptimized CartItem (no React.memo)
function UnoptimizedCartItem({ item, onRemove, onRender }) {
    const start = performance.now();
    onRender(item.id);
    const end = performance.now();
    return (
        <CartItemContainer>
            <div>
                <strong>{item.name}</strong> - ₹{item.price}
            </div>
            <RemoveButton onClick={() => onRemove(item.id)}>Remove</RemoveButton>
            <RenderInfo>Render time: {(end - start).toFixed(2)} ms</RenderInfo>
        </CartItemContainer>
    );
}

// Optimized CartItem (with React.memo)
const OptimizedCartItem = React.memo(function OptimizedCartItem({ item, onRemove, onRender }) {
    const start = performance.now();
    onRender(item.id);
    const end = performance.now();
    return (
        <CartItemContainer>
            <div>
                <strong>{item.name}</strong> - ₹{item.price}
            </div>
            <RemoveButton onClick={() => onRemove(item.id)}>Remove</RemoveButton>
            <RenderInfo>Render time: {(end - start).toFixed(2)} ms</RenderInfo>
        </CartItemContainer>
    );
});

function UnoptimizedCart() {
    const [cart, setCart] = useState([
        { id: 1, name: 'Mouse', price: 500 },
        { id: 2, name: 'Keyboard', price: 700 },
        { id: 3, name: 'Monitor', price: 15000 },
        { id: 4, name: 'Headphones', price: 1200 },
        { id: 5, name: 'Earphones', price: 1400 }
    ]);
    const [renderCounts, setRenderCounts] = useState({});

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleRender = (id) => {
        setRenderCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContainer>
            <CartTitle>Unoptimized Cart</CartTitle>
            {cart.map(item => (
                <UnoptimizedCartItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onRender={handleRender}
                />
            ))}
            <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold' }}>
                Total: ₹{total}
            </div>
            <RenderStats>
                {cart.map(item => (
                    <div key={item.id}>
                        {item.name} rendered <b>{renderCounts[item.id] || 0}</b> times
                    </div>
                ))}
            </RenderStats>
        </CartContainer>
    );
}

function OptimizedCart() {
    const [cart, setCart] = useState([
        { id: 1, name: 'Mouse', price: 500 },
        { id: 2, name: 'Keyboard', price: 700 },
        { id: 3, name: 'Monitor', price: 15000 },
        { id: 4, name: 'Headphones', price: 1200 },
        { id: 5, name: 'Earphones', price: 1400 }
    ]);
    const [renderCounts, setRenderCounts] = useState({});

    const removeItem = useCallback((id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const handleRender = useCallback((id) => {
        setRenderCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }, []);

    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }, [cart]);

    return (
        <CartContainer>
            <CartTitle>Optimized Cart (memo, useCallback, useMemo)</CartTitle>
            {cart.map(item => (
                <OptimizedCartItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onRender={handleRender}
                />
            ))}
            <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold' }}>
                Total: ₹{total}
            </div>
            <RenderStats>
                {cart.map(item => (
                    <div key={item.id}>
                        {item.name} rendered <b>{renderCounts[item.id] || 0}</b> times
                    </div>
                ))}
            </RenderStats>
        </CartContainer>
    );
}

export default function CartComparisonDemo() {
    return (
        <DemoContainer>
            <h2>Cart Memoization Comparison</h2>
            <p style={{ maxWidth: 600, margin: '0 auto 2rem', color: '#444' }}>
                Compare the difference between an <b>unoptimized cart</b> (no memo, no useCallback, no useMemo) and an <b>optimized cart</b> (with memo, useCallback, useMemo).<br />
                Remove items and watch the render counts and times!
            </p>
            <CartsRow>
                <UnoptimizedCart />
                <OptimizedCart />
            </CartsRow>
        </DemoContainer>
    );
}

const DemoContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(80, 80, 120, 0.08);
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartsRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const CartContainer = styled.div`
  background: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(80, 80, 120, 0.06);
  padding: 1.5rem 1rem;
  min-width: 320px;
  max-width: 350px;
  margin-bottom: 1rem;
`;

const CartTitle = styled.h3`
  color: #2d2d4d;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
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
  position: relative;

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

const RenderInfo = styled.div`
  font-size: 0.85rem;
  color: #888;
  position: absolute;
  right: 1rem;
  bottom: 0.2rem;
`;

const RenderStats = styled.div`
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #555;
`; 