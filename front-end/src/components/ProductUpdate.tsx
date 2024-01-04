// src/ProductUpdate.tsx

import '../css/ProductForm.css';
import { useMyContext } from '../context/DataContext';
import { Link, useParams } from 'react-router-dom';


const ProductUpdate = () => {
  const { setQty, setPrice, setTitle, setDescription, setImage, qty, price, description, title, image, handleSubmit } = useMyContext();

  return (
    <div className="product-form">

      <h2>Add a New Product</h2>
      <form action="" method="post" onSubmit={handleSubmit} >
        <div className="form-control">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" value={title} placeholder="Enter product name" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} placeholder="Enter product description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="image">image</label>
          <input type="file" name="image" accept="image/*" id="image" onChange={(e) => setImage((e.target as HTMLInputElement)?.files?.[0])}/>

        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={price} placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" value={qty} placeholder="Enter product quantity" onChange={(e) => setQty(e.target.value)} />
        </div>
        <button type="submit">Add Product</button>
      </form>

    </div>
  );
};

export default ProductUpdate;
