import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, ShoppingBag } from 'lucide-react';
import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import Profile from './pages/Profile';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (location.pathname === '/login') {
    return <Routes><Route path="/login" element={<Login />} /></Routes>;
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
          Loja PUC-Rio
        </Link>
        
        <div className="navbar-menu">
          {!token ? (
            <Link to="/login" className="btn btn-primary btn-auto">Fazer Login</Link>
          ) : (
            <>
              <Link to="/" className="btn btn-secondary btn-auto"><ShoppingBag size={18} /></Link>
              <Link to="/profile" className="btn btn-secondary btn-auto"><User size={18} /></Link>
              <button className="btn btn-danger btn-auto" onClick={handleLogout}><LogOut size={18} /></button>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;