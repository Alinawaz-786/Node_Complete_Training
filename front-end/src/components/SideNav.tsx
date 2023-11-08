// src/SideNav.tsx

import React from 'react';
import './SideNav.css';

const SideNav: React.FC = () => {
  return (
    <nav className="sidenav">
      <ul className="sidenav-list">
        <li className="sidenav-item">
          <a href="#">Home</a>
        </li>
        <li className="sidenav-item">
          <a href="#">About</a>
        </li>
        <li className="sidenav-item">
          <a href="#">Services</a>
        </li>
        <li className="sidenav-item">
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
