import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css'

export default function Footer() {
  return (
    <footer className='p-5'>
        <p>O presente site utiliza a <Link>OpenWeatherApi</Link>.</p>
        <br/>
        <p>Desenvolvido por <Link to={'https://github.com/dev-gabriel-oliveira'}>@GabrielOliver</Link></p>
    </footer>
  );
}