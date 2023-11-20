// MyContext.tsx
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

type MyContextType = {
  post: Array<{
    _id: number,
    qty: number,
    price: number,
    createdAt: string
    description: string,
    product_name: string,
  }>,
  setQty: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setProductName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;

  qty: string;
  price: string;
  description: string;
  productName: string;
  handleSubmit: (e: any) => void;

};

interface IProductProps {
  _id: number,
  qty: number,
  price: number,
  createdAt: string
  description: string,
  product_name: string,
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: any) => {
  const url = "http://localhost:4000/api/getAll";
  const [post, setPost] = useState<Array<IProductProps>>([]);


  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: any) => {
  const url = "http://localhost:4000/api/create-product";

    e.preventDefault()
    const id = post.length ? post[post.length - 1]._id + 1 : 1;
    // const newPost: any = {
    //   id, productName: productName,
    //   description: description, price: price, qty: qty
    // };
    try {

      // const response = await api.post('/posts', newPost)
      let method = 'POST';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id:id,
          productName: productName,
          description: description,
          price: price,
          qty: qty
        })
      })
        .then((res) => res.json())
        .then((d) => {
          // setData()
          console.log("This is ",d.product);
          setPost([...post, d.product]);
          console.log(post);
          setQty('');
          setPrice('');
          setProductName('');
          setDescription('');
        })


      // navigationHistory('/home');
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        return fetch(url)
          .then((res) => res.json())
          .then((d) => {
            console.log(d.post);
            setPost(d.post)
          })
      } catch (err) { }
    }
    fetchPost();
  }, [])


  return (<MyContext.Provider value={{ post, setQty, setPrice, setProductName, setDescription, qty, price, description, productName, handleSubmit }}>{children}</MyContext.Provider>);
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};