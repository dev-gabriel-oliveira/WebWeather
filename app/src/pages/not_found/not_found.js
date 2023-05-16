import React from 'react';
import { Link } from 'react-router-dom';

import './not_found.css'

export default function NotFound() {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h3>Página não encontrada!</h3>
        <br/>
        <p>Volte para a <Link to={'/'}>Página Inicial</Link></p>
    </div>
  );
}