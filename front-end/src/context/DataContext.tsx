// MyContext.tsx
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProductProps {
  _id: number,
  qty: number,
  price: number,
  createdAt: string
  image: string
  description: string,
  title: string,
}

type MyContextType = {
  post: Array<{
    _id: number,
    qty: number,
    price: number,
    image: string,
    createdAt: string
    description: string,
    title: string,
  }>,
  setPost: Dispatch<Array<IProductProps>>;
  setQty: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<File | any>>;

  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;

  email: string;
  password: string;
  token: string;
  handleLogin: (e: any) => void;

  qty: string;
  price: string;
  description: string;
  title: string;
  image: File | any;
  handleSubmit: (e: any) => void;

};



const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: any) => {
  const url = "http://localhost:4000/api/getAll";
  const [post, setPost] = useState<Array<IProductProps>>([]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<any>('');

  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | any>(null);

  const navigationHistory = useNavigate()

  const handleLogin = async (e: any) => {
    const url = "http://localhost:4000/api/login";
    e.preventDefault()

    try {
      console.log(email, password);

      let method = 'POST';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then((res) => res.json())
        .then((d) => {
          localStorage.setItem('itemName', d.token)
          const _token = localStorage.getItem('itemName')
          setToken(_token)
          navigationHistory('/product');
        })
    } catch (error) {
      console.log(error)
    }

  }
  const handleSubmit = async (e: any) => {
    const _token = localStorage.getItem('itemName')
    const url = "http://localhost:4000/api/create-product";
    e.preventDefault()
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("qty", qty)
    formData.append("image", image as File)
    console.log(image);

    try {
      let method = 'POST';
      fetch(url, {
        method: method,
        headers:{
          Authorization:'Bearer ' + _token
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((d) => {
          console.log("This is ", d.product);
          setPost([...post, d.product]);
          setQty('');
          setPrice('');
          setTitle('');
          setDescription('');
          navigationHistory('/product');
        })


    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const _token = localStorage.getItem('itemName')
    const fetchPost = async () => {
      try {
        return fetch(url,{
          headers:{
            Authorization:'Bearer ' + _token
          }
        })
          .then((res) => res.json())
          .then((d) => {
            console.log(d.post);
            setPost(d.post)
          })
      } catch (err) { }
    }
    if(_token){
      fetchPost();
    }
  }, [])


  return (<MyContext.Provider value={{ post, setPost,setEmail, setPassword, setToken, setQty, setPrice, setTitle, setDescription, setImage, email, password, token, qty, price, description, title, image, handleLogin, handleSubmit }}>{children}</MyContext.Provider>);
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};