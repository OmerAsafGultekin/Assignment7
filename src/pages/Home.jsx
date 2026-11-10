import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <h1>Welcome to the Store</h1>
      <p>Explore our catalogue, filter products, and manage your cart.</p>
      <Link
        to="/products"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          background: '#0070f3',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Browse Products
      </Link>
    </div>
  );
}