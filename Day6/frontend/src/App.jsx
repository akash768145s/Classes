import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./components/ProductContext";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import { CartProvider, CartContext } from "./components/CartContext";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Cart from "./components/Cart";

const GlobalLogoutButton = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) return null;

  return (
    <div className="global-logout-container">
      <button
        className="global-logout-btn"
        onClick={logout}
      >
        🚪 Logout
      </button>
    </div>
  );
};

const Home = () => {
  const { calculateTotalQuantity } = useContext(CartContext);
  const cartQuantity = calculateTotalQuantity();

  return (
    <div className="landscape-container">
      <div className="landscape-grid">
        <div className="landscape-btn-wrapper">
          <a href="/login" className="landscape-btn login-btn">
            <span className="btn-icon">🔐</span>
            Login
          </a>
          <a href="/products" className="landscape-btn products-btn">
            <span className="btn-icon">🛍️</span>
            Product List
          </a>
          <a href="/add-product" className="landscape-btn add-product-btn">
            <span className="btn-icon">➕</span>
            Add Product
          </a>
          <a href="/cart" className="landscape-btn cart-btn">
            <span className="btn-icon">🛒</span>
            Cart
            {cartQuantity > 0 && (
              <span className="cart-badge">{cartQuantity}</span>
            )}
          </a>

        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <GlobalLogoutButton />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
