import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgetPassword, Login, ProductForm, SingUp, Navbar, Footer, AddProduct,ProductDetail } from "./utils/baseComponents";
import { MyProvider } from './context/DataContext'


function App() {
  return (
    <MyProvider>
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/product" element={<ProductForm />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      {/* <Footer /> */}
    </div>
    </MyProvider>
  );
}

export default App;
