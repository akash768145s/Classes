import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home if already logged in
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = () => {
        login(username, password);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="landscape-container">
            <div className="login-card">
                {isLoggedIn ? (
                    <div className="logged-in-section">
                        <h2>✅ You are logged in</h2>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <h2>🔐 Login</h2>
                        <div className="login-form">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="login-input"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                            />
                            <button onClick={handleLogin} className="login-submit-btn">
                                Login
                            </button>
                            {error && <p className="login-error">{error}</p>}
                        </div>
                        <div className="login-hint">
                            <p>Hint: Use username "admin" and password "password"</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login; 