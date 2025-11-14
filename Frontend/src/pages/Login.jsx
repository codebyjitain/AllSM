import React, { useEffect, useState } from 'react'
import UserLoginRegister from '../components/usercomponents/UserLoginRegister'
import OwnerLoginRegister from '../components/ownercomponents/OwnerLoginRegister'
import UserMiddleware from '../middleware/UserMiddleware'
import OwnerMiddleware from '../middleware/OwnerMiddleware'

const Login = () => {
    const [loginState, setLoginState] = useState('user')

    useEffect(() => {
        const saved = localStorage.getItem('loginState')
        if (saved) setLoginState(saved)
    }, [])

    return (
        <div className='min-h-screen w-full flex flex-col items-center'>
            <div className='w-[90%] mt-10 mb-10'>

                {/* USER BUTTON */}
                <button
                    onClick={() => {
                        setLoginState('user')
                        localStorage.setItem('loginState', 'user')
                    }}
                    className={`w-[50%] p-3 rounded-l-2xl text-2xl hover:text-black
                        ${loginState === 'user'
                            ? "bg-blue-500 text-white"
                            : "bg-white text-blue-500"}
                    `}
                >
                    User Login
                </button>

                {/* OWNER BUTTON */}
                <button
                    onClick={() => {
                        setLoginState('owner')
                        localStorage.setItem('loginState', 'owner')
                    }}
                    className={`w-[50%] p-3 rounded-r-2xl text-2xl hover:text-black
                        ${loginState === 'owner'
                            ? "bg-blue-500 text-white"
                            : "bg-white text-blue-500 "}
                    `}
                >
                    Owner Login
                </button>
            </div>

            {loginState === 'user' &&
                <UserMiddleware >
                    <UserLoginRegister />
                </UserMiddleware>

            }
            {loginState === 'owner' &&
                // <OwnerMiddleware>
                    <OwnerLoginRegister />
                // </OwnerMiddleware>
            }
        </div>
    )
}

export default Login
