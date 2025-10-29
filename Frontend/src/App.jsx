import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserLoginRegister from './pages/UserLoginRegister'
import Home from './pages/Home'
import UserMiddleware from './middleware/UserMiddleware'
import OwnerLoginRegister from './pages/OwnerLoginRegister'
import OwnerMiddleware from './middleware/OwnerMiddleware'
import ProductPage from './pages/ProductPage'
import UserCart from './pages/UserCart'
import OAddProduct from './components/OwnerComponents/OAddProduct'
import Owner from './pages/Owner'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <UserMiddleware>
            <Home />
          </UserMiddleware>
        } />
        <Route path='/login' element={<UserLoginRegister />} />
        <Route path='/owner' element={
          <OwnerMiddleware>
            <Owner />
          </OwnerMiddleware>
        } />
        <Route path='/ownerlogin' element={<OwnerLoginRegister />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={
          <UserMiddleware>
            <UserCart />
          </UserMiddleware>
        } />
      </Routes>
    </div>
  )
}

export default App