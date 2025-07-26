import { useCart } from './CartContext';

const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 },
];

export default function ProductList() {
    const { dispatch } = useCart();

    return (
        <div className="product-list">
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name} - ₹{product.price}</span>
                        <button onClick={() => dispatch({ type: 'ADD_TO_CART', product })}>
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
} 