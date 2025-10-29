import React from 'react'
import { useNavigate } from 'react-router-dom';

const OwnerSidebar = ({setActiveSection}) => {

    const navigate = useNavigate();
    const handleAddProduct = (e) => {
        e.preventDefault();
        setActiveSection('addProduct');
    }

    const handleEditProduct = (e) => {
        e.preventDefault();
        setActiveSection('editProduct');
    }

    const handleViewProduct = (e) => {
        e.preventDefault();
        setActiveSection('viewProducts');
    }

    const handleDeleteProduct = (e) => {
        e.preventDefault();
        setActiveSection('deleteProduct');
    }

    const handleSetStock = (e) => {
        e.preventDefault();
        setActiveSection('setStock');
    }

    const handleOrders = (e) => {
        e.preventDefault();
        setActiveSection('orders');
    }

    const handlePayments = (e) => {
        e.preventDefault();
        setActiveSection('payments');
    }

    const handleProfile = (e) => {
        e.preventDefault();
        setActiveSection('profile');
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('ownertoken');
        navigate('/ownerlogin');
    }   

    return (
        <div className='max-h-screen bg-linear-to-r from-[#e1ebed] to-[#fefeff] rounded-2xl'>
            <ul className='flex flex-col gap-4 p-10 text-2xl font-semibold'>
                <li onClick={(e) => handleAddProduct(e)}>Add Product</li>
                <li onClick={(e) => handleEditProduct(e)}>Edit Product Details</li>
                <li onClick={(e) => handleViewProduct(e)}>View Products</li>
                <li onClick={(e) => handleDeleteProduct(e)}>Delete Product</li>
                <li onClick={(e) => handleSetStock(e)}>Set Stock Quantity</li>
                <li onClick={(e) => handleOrders(e)}>Orders</li>
                <li onClick={(e) => handlePayments(e)}>Earning & Payments</li>
                <li onClick={(e) => handleProfile(e)}>Profile</li>
                <li onClick={(e) => handleLogout(e)}>Logout</li>
            </ul>

        </div>
    )
}

export default OwnerSidebar