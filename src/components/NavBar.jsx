import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export default function NavBar({ theme, toggleTheme }) {
  const { user, isAuthenticated, logoutUser } = useAuth();
  
  // Select primitive item count to prevent unnecessary re-renders
  const totalItemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const getLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
    marginRight: '1rem',
  });

  return (
    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" style={getLinkStyle}>Home</NavLink>
      <NavLink to="/products" style={getLinkStyle} end>Products</NavLink>
      <NavLink to="/cart" style={getLinkStyle}>Cart ({totalItemCount})</NavLink>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="button" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {isAuthenticated ? (
          <>
            <span>Hello, {user.username}</span>
            <button type="button" onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" style={getLinkStyle}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}