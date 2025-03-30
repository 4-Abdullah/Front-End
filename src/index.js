import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Suspense } from 'react';
import Footer from './components/footer/index.js';
import Header from './components/header/index.jsx';
import App from './App';
import { CartProvider } from './components/ShoppingCart/CartContext.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider> 
        <Header/>
        <div className='App'>
            <Suspense fallback={<div>Loading...</div>}>
              <App />
            </Suspense>
          </div>
        <Footer/>
      </CartProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
