// src/ProductDetail.tsx

import '../css/ProductForm.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
    const { id } = useParams();

    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [productId, setProductId] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const url = `http://localhost:4000/api/product/${id}`;

        const fetchPost = async () => {
            try {
                return fetch(url)
                    .then((res) => res.json())
                    .then((d) => {
                        setQty(d.product.qty);
                        setPrice(d.product.price);
                        setTitle(d.product.title);
                        setProductId(d.product._id);
                        setDescription(d.product.description);
                    })
            } catch (err) { }
        }
        fetchPost();
    }, [id])
    return (
        <div className="product-form">
            <h2>Product {productId}</h2>
            <p>Title: {title}</p>
            <p>Quantity: {qty}</p>
            <p>Product Price: {price}</p>
            <p>Description: {description}</p>

            <Link to="/product">Back</Link>

        </div>
    );
};

export default ProductDetail;
