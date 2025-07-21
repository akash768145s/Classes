import React, { createContext, useState, useEffect, useCallback } from "react";

// Simple storage helper
const getStoredProducts = () => {
    try {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};

const setStoredProducts = (products) => {
    try {
        localStorage.setItem('products', JSON.stringify(products));
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
};

// Default products
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Apple", price: 0.50, quantity: 12 },
    { id: 2, name: "Banana", price: 0.25, quantity: 150 },
    { id: 3, name: "Mango", price: 0.75, quantity: 75 },
    { id: 4, name: "Cheetos", price: 20.00, quantity: 2 }
];

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [kadaPorulgal, setKadaPorulgal] = useState(() => {
        const stored = getStoredProducts();
        return stored || DEFAULT_PRODUCTS;
    });

    // Save to storage whenever products change
    useEffect(() => {
        setStoredProducts(kadaPorulgal);
    }, [kadaPorulgal]);

    const pudhuPorulAdd = useCallback((product) => {
        if (!product || !product.name || product.price < 0 || product.quantity < 0) {
            throw new Error('Invalid product data');
        }

        const newProduct = {
            ...product,
            id: Date.now(),
            name: product.name.trim()
        };

        setKadaPorulgal(prevProducts => [...prevProducts, newProduct]);
        return newProduct;
    }, []);

    const resetProducts = useCallback(() => {
        setKadaPorulgal(DEFAULT_PRODUCTS);
    }, []);

    return (
        <ProductContext.Provider value={{
            kadaPorulgal,
            pudhuPorulAdd,
            resetProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};
