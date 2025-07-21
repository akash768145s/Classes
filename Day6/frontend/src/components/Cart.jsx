import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { ProductContext } from "./ProductContext";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        calculateTotal
    } = useContext(CartContext);
    const { kadaPorulgal } = useContext(ProductContext);

    return (
        <div className="landscape-container">
            <div className="cart-card">
                <h3 className="section-title">🛒 Your Cart</h3>
                {cartItems.length === 0 ? (
                    <p className="empty-cart">Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => {
                                // Find the original product to get max quantity
                                const originalProduct = kadaPorulgal.find(p => p.id === item.id);

                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-details">
                                            <span className="cart-item-name">{item.name}</span>
                                            <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="cart-item-quantity-control">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1, originalProduct)}
                                                className="quantity-btn"
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1, originalProduct)}
                                                className="quantity-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="remove-btn"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="cart-summary">
                            <span className="total-label">Total:</span>
                            <span className="total-value">${calculateTotal()}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart; 