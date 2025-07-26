import { useCart } from './CartContext';
export default function Cart() {
    const { cart, dispatch } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <span>{item.name}{item.price}</span>

                                <div>
                                    <input type="number" value={item.quantity} onChange={(e) => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: e.target.value })} />
                                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <p>Total:₹{total}</p>
        </div>

    )
}