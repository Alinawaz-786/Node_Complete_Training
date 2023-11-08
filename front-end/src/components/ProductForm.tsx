// src/ProductForm.tsx

import React from 'react';
import './ProductForm.css';

const ProductForm: React.FC = () => {
  return (
    <div className="product-form">
      <h2>Add a New Product</h2>
      <form>
        <div className="form-control">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" placeholder="Enter product name" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="Enter product description" />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" placeholder="Enter product price" />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" placeholder="Enter product quantity" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
