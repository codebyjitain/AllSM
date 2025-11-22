import React, { useEffect, useState } from 'react'

const Navbar = ({ setOpenSideBar, openSideBar }) => {

    // only for mobile
    const [openMenu, setOpenMenu] = useState(false)



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
                <h2 className='p-2 bg-white rounded-xl'>0</h2>
            </h2>

            {/* profile option */}
            <div>

                <div className="relative flex items-center gap-5">

                    {/* DESKTOP BUTTONS */}
                    <div className="hidden md:flex items-center gap-5">
                        <button className="p-2 bg-white rounded-3xl">Cart</button>
                        <button className="p-2 bg-white rounded-3xl">Orders</button>

                        {/* Profile */}
                        <div className="flex items-center gap-2 bg-white rounded-3xl px-3 py-2 cursor-pointer">
                            <h2 className="capitalize">Profile Name</h2>
                            <div className="border rounded-full px-2 py-1">O</div>
                        </div>
                    </div>

                    {/* MOBILE PROFILE ICON ONLY */}
                    <div
                        className="md:hidden bg-white p-2 rounded-full cursor-pointer"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        O
                    </div>

                    {/* MOBILE DROPDOWN PANEL */}
                    {openMenu && (
                        <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl w-40 p-3 flex flex-col gap-3 text-center md:hidden z-50">
                            <button className="p-2 bg-gray-100 rounded-xl">Cart</button>
                            <button className="p-2 bg-gray-100 rounded-xl">Orders</button>
                            <button className="p-2 bg-gray-100 rounded-xl">Profile</button>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

export default Navbar;
