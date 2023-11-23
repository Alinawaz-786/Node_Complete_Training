// src/ProductForm.tsx

import '../css/ProductForm.css';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/DataContext';

const ProductForm = () => {
  const { post } = useMyContext();
  
  const handleDelete = (id:number) => {
    const url = `http://localhost:4000/api/delete/${id}`;
    try {
      let method = 'DELETE';
      fetch(url, {
        method: method,
      })
        .then((res) => res.json())
        .then((d) => {
          console.log("This is ",d);
     
        })


    } catch (error) {
      console.log(error)
    }
  };
  /**
    const url = "http://localhost:4000/api/getAll";
    const [data, setData] = useState<any[]>([]);
    const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setData(d.post)
      })
  }
  useEffect(() => {
    console.log(post);
    fetchInfo();
  }, []);   
   */

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
