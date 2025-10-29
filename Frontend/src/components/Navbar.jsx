import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleCart = (e) => {
        e.preventDefault();
        navigate('/cart');
    }
    return (
        <div className=' h-16 flex justify-between p-3 bg-[#eaf1f1] rounded-4xl'>
            <div className='flex gap-5'>
                <div className='bg-[#e4eaec] flex items-center p-3 rounded-4xl'>
                    Logo
                </div>
                <div className='flex gap-3 items-center bg-white p-2 rounded-4xl'>
                    <input placeholder='Search Product' className='p-2 border-none' type="text" />
                    <input type="submit" className='bg-black text-white p-1 rounded-full' value="sea" />
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <button className='p-2 bg-white rounded-4xl' onClick={(e)=> handleCart(e)}>Cart</button>
                <button className='p-2 bg-white rounded-4xl'>Orders</button>
                <div className='flex gap-2 items-center bg-white rounded-4xl'>
                    <h2 className='p-2'>Profile Name</h2>
                    <div className='border border-[#e5e4e2] mx-2 rounded-4xl px-1' >PI</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar