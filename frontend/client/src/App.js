import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AdminDashBoard from './pages/AdminDashBoard';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProducts';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<ProductList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/admin' element={<AdminDashBoard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-product' element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
