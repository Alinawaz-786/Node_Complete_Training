// src/ProductForm.tsx

import '../css/ProductForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/DataContext';

const ProductForm = () => {
  const { post, setPost } = useMyContext();
  const navigationHistory = useNavigate()
  const handleDelete = (id: number) => {
    const _token = localStorage.getItem('itemName')
    const url = `http://localhost:4000/api/delete/${id}`;
    try {
      let method = 'DELETE';
      fetch(url, {
        method: method,
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
        .then((res) => res.json())
        .then((d) => {
          removeItem(id);
          console.log(d.message);
          navigationHistory('/product');
        })

    } catch (error) {
      console.log(error)
    }
  };

  const removeItem = (itemId: number) => {
    // Create a new array excluding the object with the specified itemId
    const updatedItems = post.filter(post => post._id !== itemId);
    // Update the state with the new array
    setPost(updatedItems);
  };

  return (
    <div className="product-form">
      <Link to="/add-product">Add Product</Link>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {post.map((dataObj, index) => {
            return (
              <tr key={dataObj._id} >
                <td>{String(dataObj._id).slice(0, 3)}</td>
                <td>{dataObj.title}</td>
                <td>{dataObj.price}</td>
                <td>{dataObj.qty}</td>
                <td>
                  <Link to={"/product/" + dataObj._id}>View</Link> |
                  <a href="#" onClick={() => handleDelete(dataObj._id)}>Delete</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ProductForm;
