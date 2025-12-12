import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <div className="product-image">
        <img
          src={product.image || '/default-product.png'}
          alt={product.name}
        />
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="price">${product.price}</span>
          {product.oldPrice && (
            <span className="old-price">${product.oldPrice}</span>
          )}
        </div>
      </div>

      <div className="product-actions">
        <button
          className="btn btn-add-cart"
          onClick={() => onAddToCart(product)}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductItem;