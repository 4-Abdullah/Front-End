// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import LoginPage from './Login/page.js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/header/index.jsx';
import SignupPage from './Register/page';
import Product from './products/page.js';
import Productdetails from './product/page.js';
import Cart from './components/Cart/index.js'
import Order from './components/Order/index.js';
import Success from './components/Order/Success.js';
import Cancel from './components/Order/Cancel.js';
import Footer from './components/footer/index';
import ProductSearch from './components/SearchProducts/index.js';

function App() {
 
  const location = useLocation();
  const hideLayout = location.pathname === "/success/:id" || location.pathname === "/cancel/:id";
  // const authToken = localStorage.getItem('authToken')
  // if(authToken){
  //   setuserauthToken(true)
  // }
  // else{
  //   setuserauthToken(false)
  // }
  return (
    

        <Routes>
        {/* <Route path="/:username" element={<Home/>} /> */}
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/SignUp" element={<SignupPage/>}/>
        <Route path="/" element={<Product/>}></Route>
        <Route path="/searchProducts" element={<ProductSearch/>}></Route>
        <Route path="/Category" element={<ProductSearch/>}></Route>
        <Route path="/products/:id" element={<Productdetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/order/:id" element={<Order/>}></Route>
        <Route path="/success/:id" element={<Success/>}></Route>
        <Route path="/cancel/:id" element={<>{hideLayout && <Footer />}<Cancel/></>}></Route>
        {/* <Route path="/SinglePostPage/:id" element={<SinglePostPage/>}/> */}
        {/* <Route path="/EditPostPage/:id" element={<EditPostPage/>}/> */}
        </Routes> 
    );
}

export default App;
