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

  qty: number;
  price: number;
  description: string;
  title: string;
  image: File | any;
  handleSubmit: (e: any) => void;

};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: any) => {
  const url = "http://localhost:4000/graphql";
  const [post, setPost] = useState<Array<IProductProps>>([]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<any>('');

  const [qty, setQty] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | any>(null);

  const navigationHistory = useNavigate()

  const handleLogin = async (e: any) => {
    const graphqlQuery = {
      query: `{
        login(email:"${email}",password:"${password}")
        {
          token
          userId
        }
      }`
    };

    const url = "http://localhost:4000/graphql";
    e.preventDefault()

    try {
      console.log(email, password);

      let method = 'POST';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
        .then((res) => res.json())
        .then((d) => {
          console.log(d.data.login.token);

          if (d.errors && d.errors[0].status === 422) {
            throw new Error("validation Failed. on Server side response");
          }
          if (d.errors && d.errors[0].data) {
            console.log(d.errors[0].data);
            // throw new Error("validation Failed. on Server side response");
          }
          if (d.errors) {
            throw new Error("User login failed");
          }
          localStorage.setItem('itemName', d.data.login.token)
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
    let graphqlQuery = {
      query: `
    mutation{
      createProduct(productInput:{title:"${title}",description:"${description}",
        imgUrl:"${image as File}",price:${Number(price)},qty:${Number(qty)}}){
        _id
        title
        description
        price
        qty
        createdAt
      }
    }`};

    const url = "http://localhost:4000/graphql";
    e.preventDefault()
    // const formData = new FormData();
    // formData.append("title", title)
    // formData.append("description", description)
    // formData.append("price", price)
    // formData.append("qty", qty)
    // formData.append("image", image as File)
    // console.log(image);

    try {
      let method = 'POST';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + _token
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((res) => res.json())
        .then((d) => {

          if (d.errors && d.errors[0].status === 422) {
            throw new Error("validation Failed. on Server side response");
          }
          if (d.errors && d.errors[0].data) {
            console.log(d.errors[0].data);
          }

          console.log("This is ", d.data.createProduct);
          setPost([...post, d.data.createProduct]);
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
    const graphqlQuery = {
      query: `{
        product{
          product{
            _id
            title
            description
            qty
            price
            createdAt
          }
          totalProduct
        }
      }`
    };

    const fetchPost = async () => {
      try {
        return fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + _token,
          },
          body: JSON.stringify(graphqlQuery),
        })
          .then((res) => res.json())
          .then((d) => {
            console.log(d.data.product.product);
            setPost(d.data.product.product)
          })
      } catch (err) { }
    }
    if (_token) {
      fetchPost();
    }
  }, [])


  return (<MyContext.Provider value={{ post, setPost, setEmail, setPassword, setToken, setQty, setPrice, setTitle, setDescription, setImage, email, password, token, qty, price, description, title, image, handleLogin, handleSubmit }}>{children}</MyContext.Provider>);
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};