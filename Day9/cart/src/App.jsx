import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import CartPage from './pages/CartPage';
import { useCart } from './components/CartContext';

function App() {
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="app-container">
            <header className="header">
                <h1><Link to="/" className="header-link">React Shopping Cart</Link></h1>
                <nav>
                    <Link to="/cart" className="nav-link">
                        Cart ({cartCount})
                    </Link>
                </nav>
            </header>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App; 