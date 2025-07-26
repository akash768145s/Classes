import { useCart } from './CartContext';

export default function Cart() {
    const { cart, dispatch } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <span>{item.name} (₹{item.price})</span>
                                <div>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={e => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: parseInt(e.target.value) })}
                                    />
                                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{total.toFixed(2)}</h3>
                </>
            )}
        </div>
    );
} 