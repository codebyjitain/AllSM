import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const OwnerLoginRegister = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('ownertoken');
        if (token) {
            navigate('/owner');
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/owners/register', { name, email: registerEmail, password: registerPassword })
            if (response.status === 201) {
                console.log('Registration successful');
                const data = await response.data;
                const token = data.token;
                localStorage.setItem('ownertoken', token);
                navigate('/owner');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/owners/login', { email, password })
            if (response.status === 200) {
                const data = await response.data;
                const token = data.token;
                localStorage.setItem('ownertoken', token);
                navigate('/owner');

            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const handleUser = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className='flex bg-linear-to-b from-[#eef1db] to-[#d1dcdd] min-h-screen items-center justify-between'>
            <div className='w-1/3 ml-20 flex flex-col items-center gap-5'>
                <h1 className='text-4xl p-2 bg-white rounded-2xl'>Logo</h1>
                <img className='w-full  rounded-4xl' src="/src/assets/ownerImage.png" alt="" />

            </div>
            <div className='flex flex-col gap-3 w-2/3 justify-center items-center'>
                <h1 className='text-5xl text-white'>Owner Login</h1>
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
                <input type="submit" className='border border-black bg-black text-white text-2xl p-1 rounded' value="User Login" onClick={(e) => handleUser(e)} />

            </div>

        </div>
    )
}

export default OwnerLoginRegister