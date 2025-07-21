import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "./ProductContext";
import { AuthContext } from "./AuthContext";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const { pudhuPorulAdd, kadaPorulgal } = useContext(ProductContext);
    const { isLoggedIn } = useContext(AuthContext);

    const handleAdd = () => {
        try {
            if (productName.trim() === "") {
                toast.error("Product name cannot be empty");
                return;
            }

            const price = parseFloat(productPrice);
            if (isNaN(price) || price < 0) {
                toast.error("Invalid price. Please enter a non-negative number.");
                return;
            }

            const quantity = parseInt(productQuantity);
            if (isNaN(quantity) || quantity < 0) {
                toast.error("Invalid quantity. Please enter a non-negative integer.");
                return;
            }

            // Check for duplicate product name
            const isDuplicate = kadaPorulgal.some(
                product => product.name.toLowerCase() === productName.trim().toLowerCase()
            );

            if (isDuplicate) {
                toast.error(`A product with the name "${productName}" already exists.`);
                return;
            }

            const newProduct = {
                name: productName.trim(),
                price: price,
                quantity: quantity
            };

            pudhuPorulAdd(newProduct);
            toast.success(`Product "${newProduct.name}" added successfully!`);

            // Reset form
            setProductName("");
            setProductPrice("");
            setProductQuantity("");
        } catch (error) {
            toast.error(`Failed to add product: ${error.message}`);
        }
    };

    // If not logged in, redirect to login page

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="landscape-container">
            <div className="add-product-card">
                <h3 className="section-title">➕ Add New Product</h3>
                <input
                    className="add-product-input"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                />
                <input
                    className="add-product-input"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                />
                <input
                    className="add-product-input"
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Quantity"
                    min="0"
                />
                <button className="primary-btn" onClick={handleAdd}>
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
