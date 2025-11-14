import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/userpages/Home'
import UserMiddleware from './middleware/UserMiddleware'
import OwnerMiddleware from './middleware/OwnerMiddleware'
import ProductPage from './pages/userpages/ProductPage'
import UserCart from './pages/userpages/UserCart'
import Owner from './pages/ownerpages/Owner'
import OEditProductPage from './pages/ownerpages/OEditProductPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={
          <UserMiddleware>
            <Home />
          </UserMiddleware>
        } />
        <Route path='/login' element={
          <Login />
        } />
        <Route path='/owner' element={
          <OwnerMiddleware>
            <Owner />
          </OwnerMiddleware>
        } />
        
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={
          <UserMiddleware>
            <UserCart />
          </UserMiddleware>
        } />

        <Route path='/owner/editproduct/:id' element={
          <OwnerMiddleware>
            <OEditProductPage />
          </OwnerMiddleware>
        } />
      </Routes>
    </div>
  )
}

export default App