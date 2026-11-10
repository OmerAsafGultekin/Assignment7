import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Select only the addItem action to avoid unnecessary re-renders
  const addItem = useCartStore((state) => state.addItem);

  // Re-fetch whenever the URL parameter id changes
  const { data: product, loading, error } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  if (loading) return <p>Loading product details...</p>;
  if (error) {
    return (
      <div style={{ padding: '1rem', color: '#b00' }}>
        <h3>Product Not Found</h3>
        <p>{error}</p>
        <button type="button" onClick={() => navigate('/products')}>
          Back to Catalogue
        </button>
      </div>
    );
  }
  if (!product) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}
      >
        &larr; Back
      </button>

      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', maxHeight: '350px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '6px' }}
      />

      <h2 style={{ marginTop: '1rem' }}>{product.title}</h2>
      <p style={{ color: '#777', textTransform: 'capitalize' }}>Category: {product.category}</p>
      <p style={{ lineHeight: '1.6' }}>{product.description}</p>
      <h3 style={{ color: '#0070f3' }}>${product.price?.toFixed(2)}</h3>

      <button
        type="button"
        onClick={() => addItem(product)}
        style={{
          padding: '0.6rem 1.2rem',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}