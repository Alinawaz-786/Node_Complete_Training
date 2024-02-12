import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgetPassword, Login, ProductForm, SingUp, Navbar, Footer, AddProduct, ProductDetail } from "./utils/baseComponents";
import { MyProvider } from './context/DataContext'
import PrivateRoute from './components/PrivateRoute';

function App() {
  const _token = localStorage.getItem('itemName')
  return (
    <MyProvider>
      <div className="App">
        <Navbar />
        <Routes>
 
          <Route path='/' element={<PrivateRoute />}>
            <Route path="/product" element={<ProductForm />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
            
            <Route path="/signup" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
        <Footer />
      </div>
    </MyProvider>
  );
}

export default App;
