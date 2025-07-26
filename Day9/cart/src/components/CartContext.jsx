import React, { createContext, useContext, useReducer } from 'react';

// CartContext-nu oru context create pannrom – global-a cart data share panna
const CartContext = createContext();

// cartReducer – cart update panna oru function, action type based pannitu state update pannum
const cartReducer = (state, action) => {
    switch (action.type) {
        // Cart-ku product add panna
        case 'ADD_TO_CART':
            // Id already iruka item-a check panrom
            const existing = state.find(item => item.id === action.product.id);
            if (existing) {
                // Already irundha quantity-a 1 increment pannrom
                return state.map(item =>
                    item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Illena, pudhu product add pannrom, quantity = 1
            return [...state, { ...action.product, quantity: 1 }];

        // Cart-la irundhu oru item remove panna
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.id); // id match aagatha item mathiriye retain pannrom

        // Quantity update panna (minimum 0, but 0 aana filter panni remove pannrom)
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.id === action.id ? { ...item, quantity: Math.max(0, action.quantity) } : item
            ).filter(item => item.quantity > 0); // quantity 0-aana item list-la irukka koodathu

        // Unknown action type vandha, existing state return pannrom
        default:
            return state;
    }
};

// Ithu cart context provider – app-ku thara wrapper component
export const CartProvider = ({ children }) => {
    // useReducer – cart state and dispatch function prepare pannrom
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        // CartContext-kulla cart state and dispatch pass pannrom
        <CartContext.Provider value={{ cart, dispatch }}>
            {children} {/* App components ellam children-a varum */}
        </CartContext.Provider>
    );
};

// useCart – easy-a cart context access panna custom hook
export const useCart = () => useContext(CartContext); 
