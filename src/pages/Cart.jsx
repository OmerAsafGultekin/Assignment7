import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  // Derive total price during render
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Your cart is empty</h3>
        <p>Looks like you have not added anything to your cart yet.</p>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#0070f3',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Shopping Cart</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 0.5rem' }}>{item.title}</h4>
              <p style={{ margin: 0, color: '#555' }}>
                ${item.price.toFixed(2)} each
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                -
              </button>
              <span style={{ minWidth: '24px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                +
              </button>
            </div>

            <div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '2px solid #eee',
        }}
      >
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          type="button"
          onClick={clear}
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}