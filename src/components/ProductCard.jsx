import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <div>
        <h4 style={{ margin: '0.75rem 0 0.25rem' }}>{product.title}</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{product.category}</p>
        <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>${product.price.toFixed(2)}</p>
      </div>
      <Link
        to={`/products/${product.id}`}
        style={{ textAlign: 'center', padding: '0.5rem', background: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}
      >
        View Details
      </Link>
    </div>
  );
}