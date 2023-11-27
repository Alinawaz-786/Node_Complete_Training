// src/Navbar.tsx

import React from 'react';
import '../css/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const _token = localStorage.getItem('itemName')
  const navigationHistory = useNavigate()

  const handleLogOut = async (e: any) => {

    localStorage.removeItem('itemName')
    navigationHistory('/Login');
  }
  return (
    <nav className="navbar">
      <ul className="navbar-nav">


        {_token ? (
          <li className="nav-item">
            <Link to="/product" className="nav-link">Product</Link>
          </li>
        ) : ("")}

        {_token ? (
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleLogOut}>
              logOut
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/Login" className="nav-link">Login</Link>
          </li>
        )}

        <li className="nav-item">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
