// src/AddProduct.tsx

import '../css/ProductForm.css';
import { useMyContext } from '../context/DataContext';


const AddProduct = () => {
  const {setQty,setPrice,setProductName,setDescription,qty,price,description,productName,handleSubmit} = useMyContext();
  /*
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const url = "http://localhost:4000/api/create-product";
  const handleTransfer = async (e: any) => {
    console.log("test");
    
    e.preventDefault()
    let method = 'POST';
    fetch(url,{
      method:method,
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        productName:productName,
        description:description,
        price:price,
        qty:qty
      })
    })
    .then((res) => res.json())
    .then((d) => {
      // setData(d.post)
    })
  }
*/
  return (
    <div className="product-form">

      <h2>Add a New Product</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" value={productName} placeholder="Enter product name" onChange={(e) => setProductName(e.target.value)}  />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} placeholder="Enter product description" onChange={(e) => setDescription(e.target.value)}  />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={price} placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)}  />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" value={qty} placeholder="Enter product quantity" onChange={(e) => setQty(e.target.value)}  />
        </div>
        <button type="submit">Add Product</button>
      </form>

    </div>
  );
};

export default AddProduct;
