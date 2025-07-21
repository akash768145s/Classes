import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "./ProductContext";
import { CartContext } from "./CartContext";

const ProductList = () => {
    const { kadaPorulgal, resetProducts } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addToCart(
            product,
            (message) => toast.success(message),
            (message) => toast.error(message)
        );
    };

    const handleResetProducts = () => {
        resetProducts();
        toast.info('Products reset to default');
    };

    return (
        <div className="landscape-container">
            <div className="product-list-card">
                <div className="product-list-header">
                    <h3 className="section-title">📦 Product Listings</h3>
                    <button onClick={handleResetProducts} className="reset-products-btn">
                        🔄 Reset Products
                    </button>
                </div>

                {kadaPorulgal.length === 0 ? (
                    <div className="no-products">
                        <p>No products available</p>
                        <button onClick={handleResetProducts}>Load Default Products</button>
                    </div>
                ) : (
                    <div className="product-grid">
                        {kadaPorulgal.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-header">
                                    <h4>{product.name}</h4>
                                </div>
                                <div className="product-details">
                                    <div className="product-detail">
                                        <span className="detail-label">Price:</span>
                                        <span className="detail-value">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="product-detail">
                                        <span className="detail-label">Quantity:</span>
                                        <span className="detail-value">{product.quantity}</span>
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.quantity <= 0}
                                    >
                                        🛒 Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
