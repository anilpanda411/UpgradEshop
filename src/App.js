import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddProduct from './components/products/AddProduct';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import Addressform from './components/products/AddressForm'; // new added
import OrderConfirmation from './components/products/OrderConfirmation'; // new added
import Editproduct from './components/products/EditProducts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));  // Initialize with localStorage
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('isAdmin'));          // Initialize with localStorage

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/products" element={isLoggedIn ? <Products isAdmin={isAdmin} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<AddProduct />} />  {/* Updated route */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/Address" element={<Addressform />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/edit-product/:id" element={<Editproduct />} />
      </Routes>
    </Router>
  );
};

export default App;
