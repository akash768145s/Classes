import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

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
    },
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            // Fallback for incognito mode
            sessionStorage.removeItem(key);
        }
    }
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Check storage for login state with incognito support
        return StorageWrapper.getItem('isLoggedIn') === 'true';
    });
    const [error, setError] = useState(null);

    // Save login state to storage whenever it changes
    useEffect(() => {
        StorageWrapper.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const login = (username, password) => {
        if (username === "admin" && password === "password") {
            setIsLoggedIn(true);
            StorageWrapper.setItem('isLoggedIn', 'true');
            setError(null);
        } else {
            setError("Invalid credentials");
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        StorageWrapper.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 