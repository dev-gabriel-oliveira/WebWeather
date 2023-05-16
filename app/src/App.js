import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './components/navbar/navbar.js';
import UserRoutes from './routes/routes.js';
import Footer from './components/footer/footer.js';

function App() {
  return (
    <BrowserRouter>
        <NavBar/>

        <div className='main bg-gradient-to-r from-sky-600 to-indigo-600'>
          <UserRoutes/>
        </div>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;