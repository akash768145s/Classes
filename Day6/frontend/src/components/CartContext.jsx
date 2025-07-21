import React, { createContext, useState, useEffect } from "react";

// Wrapper for localStorage to handle incognito mode
const StorageWrapper = {
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            // Fallback for incognito mode
            return sessionStorage.getItem(key);
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // Fallback for incognito mode
            sessionStorage.setItem(key, value);
        }
    }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from storage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = StorageWrapper.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to storage whenever it changes
    useEffect(() => {
        StorageWrapper.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart with quantity validation
    const addToCart = (product, onSuccess, onError) => {
        setCartItems(prevItems => {
            // Check if product already exists in cart
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                const existingItem = prevItems[existingItemIndex];

                // Check if adding another would exceed available quantity
                if (existingItem.quantity + 1 > product.quantity) {
                    onError && onError(`Cannot add more ${product.name}. Maximum quantity reached.`);
                    return prevItems;
                }

                // Update existing item
                const updatedCart = [...prevItems];
                updatedCart[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };

                onSuccess && onSuccess(`Added another ${product.name} to cart`);
                return updatedCart;
            } else {
                // If not in cart, add new item
                onSuccess && onSuccess(`Added ${product.name} to cart`);
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    // Update item quantity with validation
    const updateQuantity = (productId, newQuantity, product) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === productId) {
                    // Validate new quantity against available product quantity
                    const validQuantity = Math.min(newQuantity, product.quantity);
                    return { ...item, quantity: validQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) =>
            total + (item.price * item.quantity), 0
        ).toFixed(2);
    };

    // Calculate total quantity of items in cart
    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) =>
            total + item.quantity, 0
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            calculateTotal,
            calculateTotalQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}; 