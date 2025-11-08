import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/slices/userSlice';

const UserLoginRegister = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                name: name,
                email: registerEmail,
                password: registerPassword
            };

            dispatch(registerUser(userData))
            
            setName('');
            setRegisterEmail('');
            setRegisterPassword('');

            toast.success('Registration successful! Please login.');
            
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Registration failed. Please try again.');
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = {
                email: email,
                password: password
            };

            dispatch(loginUser(loginData))
            
            toast.success('Login successful!');

        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Login failed. Please check your credentials and try again.');
        }
    }

    const handleOwner = (e) => {
        e.preventDefault();
        navigate('/ownerlogin');
    }

    return (
        <div className='flex min-h-screen items-center justify-between'>
            <div className='w-1/3 ml-20 flex flex-col items-center gap-5'>
                <h1 className='text-4xl p-2 bg-white rounded-2xl'>Logo</h1>
                <img className='w-full  rounded-4xl' src="/src/assets/user.png" alt="" />
            </div>
            <div className='flex flex-col gap-3 w-2/3 justify-center items-center'>
                <h1 className='text-5xl text-white'>User Login</h1>
                <div className='flex bg-linear-to-r from-[#e1ebed] to-[#fefeff] p-10 rounded-4xl flex-col gap-4 w-1/3 mx-auto mt-10'>

                    <input type="text" className='border border-black p-2 rounded' placeholder='Enter Name' value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                    <input type="email" className='border border-black p-2 rounded' placeholder='Enter Email' value={registerEmail} onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }} />
                    <input type="password" className='border border-black p-2 rounded' placeholder='Enter Password' value={registerPassword} onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }} />
                    <input type="submit" className='border border-black bg-black text-white text-2xl p-2 rounded' onClick={(e) => handleRegister(e)} value="Register" />
                </div>
                <div className='flex bg-linear-to-r from-[#e1ebed] to-[#fefeff] p-10 rounded-4xl flex-col gap-4 w-1/3 mt-10'>
                    <input type="email" className='border border-black p-2 rounded' placeholder='Enter Email' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <input type="password" className='border border-black p-2 rounded' placeholder='Enter Password' value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <input type="submit" className='border border-black bg-black text-white text-2xl p-2 rounded' onClick={(e) => handleSubmit(e)} value="Login" />

                </div>
                <input type="submit" className='border border-black bg-black text-white text-2xl p-1 rounded' value="Owner Login" onClick={(e) => handleOwner(e)} />

            </div>
        </div>
    )
}

export default UserLoginRegister