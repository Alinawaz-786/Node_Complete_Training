// MyContext.tsx
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

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
  setQty: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<File | any>>;

  qty: string;
  price: string;
  description: string;
  title: string;
  image: File | any;
  handleSubmit: (e: any) => void;

};

interface IProductProps {
  _id: number,
  qty: number,
  price: number,
  createdAt: string
  image: string
  description: string,
  title: string,
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: any) => {
  const url = "http://localhost:4000/api/getAll";
  const [post, setPost] = useState<Array<IProductProps>>([]);


  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | any>(null);

  const handleSubmit = async (e: any) => {
  const url = "http://localhost:4000/api/create-product";

    e.preventDefault()
    // const id = post.length ? post[post.length - 1]._id + 1 : 1;
    // const newPost: any = {
    //   id, title: title,
    //   description: description, price: price, qty: qty
    // };

    const formData = new FormData();
    formData.append("title",title)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("qty",qty)
    // formData.append("image",image)
    console.log(formData);
    
    try {

      // const response = await api.post('/posts', newPost)
      let method = 'POST';
      fetch(url, {
        method: method,
        headers:  {
          'Content-Type': `multipart/form-data;`,
        },
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: formData,
        // body: JSON.stringify({
        //   _id:id,
        //   title: title,
        //   description: description,
        //   price: price,
        //   qty: qty,
        //   image:image,
        // })
      })
        .then((res) => res.json())
        .then((d) => {
          // setData()
          console.log("This is ",d.product);
          setPost([...post, d.product]);
          console.log(post);
          setQty('');
          setPrice('');
          setTitle('');
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


  return (<MyContext.Provider value={{ post, setQty, setPrice, setTitle, setDescription,setImage, qty, price, description, title,image, handleSubmit }}>{children}</MyContext.Provider>);
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};