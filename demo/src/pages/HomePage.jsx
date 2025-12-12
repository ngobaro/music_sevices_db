import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductItem from '../components/features/ProductItem';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Không thể tải sản phẩm');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Chào mừng đến với cửa hàng của chúng tôi</h1>
        <p>Khám phá các sản phẩm chất lượng với giá cả phải chăng</p>
      </div>

      <div className="products-section">
        <h2>Sản phẩm nổi bật</h2>

        {products.length === 0 ? (
          <p className="no-products">Không có sản phẩm nào</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;