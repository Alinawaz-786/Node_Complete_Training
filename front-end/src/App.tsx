import React from 'react';
import Login from './components/Login.tsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
            <h1>gggggggggg</h1>
          <Routes>
            <Route path="/login" element={<Login/>} />
          </Routes>
    </div>
  );
}

export default App;