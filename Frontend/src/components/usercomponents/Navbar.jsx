import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {ListOrdered, Search, ShoppingCart, User } from 'lucide-react'
import { useSelector } from 'react-redux'

const Navbar = ({ setOpenSideBar, openSideBar }) => {
    const navigate = useNavigate()
    const {userInfo} = useSelector(state=>state.user)

    // only for mobile
    const [openMenu, setOpenMenu] = useState(false)

    const handleCart = (e)=>{
        e.preventDefault()
        navigate('/cart')
    }

    

    return (
        <div className="h-16 flex items-center justify-between p-4 bg-[#eaf1f1] rounded-4xl w-full">

            {/* ✅ Left Section (Menu + Logo) */}
            <div className="flex items-center gap-4">
                {/* Sidebar Button - Only Mobile */}
                <button
                    className="block md:hidden p-2 bg-blue-500 text-white rounded-xl"
                    onClick={() => setOpenSideBar(!openSideBar)}
                >
                    ☰
                </button>

                {/* Logo */}
                <h2 className="font-bold text-lg">Logo</h2>
            </div>

            {/* ✅ Center */}
            <h2 className="text-lg capitalize flex items-center gap-1">
                <input type="search" className='p-2 bg-white w-5/6 rounded-xl' placeholder='Search Here..' />
                <Search className='bg-white w-10 h-10 p-2 rounded-2xl'/>
            </h2>

            {/* profile option */}
            <div>

                <div className="relative flex items-center gap-5">

                    {/* DESKTOP BUTTONS */}
                    <div className="hidden md:flex items-center gap-5">
                        <button className="p-2 bg-white rounded-3xl flex items-center gap-1" onClick={(e)=>handleCart(e)}>Cart
                            <ShoppingCart />
                        </button>
                        <button className="p-2 bg-white rounded-3xl flex items-center gap-1">Orders
                            <ListOrdered />
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-2 bg-white rounded-3xl px-3 py-2 cursor-pointer">
                            <h2 className="capitalize">{userInfo?.user.name}</h2>
                            <div className="border rounded-full px-2 py-1">
                                <User />
                            </div>
                        </div>
                    </div>

                    {/* MOBILE PROFILE ICON ONLY */}
                    <div
                        className="md:hidden bg-white p-2 rounded-full cursor-pointer"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <User />
                    </div>

                    {/* MOBILE DROPDOWN PANEL */}
                    {openMenu && (
                        <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl w-40 p-3 flex flex-col gap-3 text-center md:hidden z-50">
                            <button className="p-2 bg-gray-100 rounded-xl flex gap-2 justify-center" onClick={(e)=>handleCart(e)}>Cart <ShoppingCart/></button>
                            <button className="p-2 bg-gray-100 flex gap-2 justify-center rounded-xl">Orders
                                <ListOrdered />
                            </button>
                            <button className="p-2 flex gap-2 justify-center bg-gray-100 rounded-xl">Profile
                                <User />
                            </button>
                            <button className='p-2 bg-red-500 text-white rounded-xl' onClick={()=>{
                                localStorage.removeItem('token')
                                window.location.reload()
                            }}>LogOut</button>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

export default Navbar;
