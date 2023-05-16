import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css'

export default function NavBar() {
  return (
    <nav className="navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" href="#">☀ Início</Link>
      </div>
    </nav>
  );
}