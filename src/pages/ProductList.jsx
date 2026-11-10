import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const { data: products, loading, error } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  // Derive unique categories from fetched products
  const categories = products
    ? Array.from(new Set(products.map((p) => p.category)))
    : [];

  // Filter products directly during render
  const filteredProducts = (products || []).filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchParams(val ? { q: val } : {});
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSearchParams(val ? { category: val } : {});
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Product Catalogue</h2>
      
      {/* Filters bound to URL query params */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={handleSearchChange}
          style={{ padding: '0.5rem', minWidth: '220px' }}
        />
        <select value={category} onChange={handleCategoryChange} style={{ padding: '0.5rem' }}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}