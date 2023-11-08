import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgetPassword, Login, ProductForm,SingUp,Navbar,Footer } from "./utils/baseComponents";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/product" element={<ProductForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
