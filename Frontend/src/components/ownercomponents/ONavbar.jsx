import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOwner } from '../../redux/slices/ownerSlice';

const ONavbar = ({ setOpenSideBar, openSideBar }) => {
    const { owner } = useSelector((state) => state.owner);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(verifyOwner());
    }, []);

    useEffect(() => {
        if (owner?.name) {
            setName(owner.name);
        }
    }, [owner]);

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

            {/* ✅ Center (Greeting - visible on all screens) */}
            <h2 className="text-lg capitalize hidden sm:block">
                Hi, {name}
            </h2>

            {/* ✅ Right Section (Dashboard title - Desktop only) */}
            <h2 className="text-lg font-semibold hidden md:block">
                Owner Dashboard
            </h2>
        </div>
    );
}

export default ONavbar;
