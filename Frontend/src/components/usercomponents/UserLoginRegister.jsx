import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserLoginRegister = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formState, setFormState] = useState("signup");
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem("formState");
        if (saved) setFormState(saved);
    }, []);



    // handle Sign Up
    const handleSignUp = (e) => {
        e.preventDefault()
        try {
            const userData = {
                name,
                email,
                password,
                gender,
                address
            }
            dispatch(registerUser(userData))
            setEmail('')
            setName('')
            setPassword('')
            setAddress('')
            setGender('')
            toast.success("Registered Success")
        } catch (err) {
            toast.error("Failed")
        }
    }


    // handle Login
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginData = {
                email,
                password
            }
            const result = await dispatch(loginUser(loginData));

            if (loginUser.fulfilled.match(result)) {
                // token is now in redux payload
                const token = result.payload?.token;
                if (token) localStorage.setItem("token", token);

                navigate('/');
                toast.success("Login Success");
            } else {
                toast.error("Invalid Credentials");
            }

        } catch (error) {
            toast.error("Login Failed")
        }
    }

    return (
        <div className=' w-screen flex flex-col md:flex-row justify-between p-4 md:p-0'>

            {/* Image section */}
            <div className='w-full md:w-[30%] flex items-center justify-center mb-6 md:mb-0'>
                <img src="/src/assets/user.png" className='w-[90%] rounded-2xl' alt="" />
            </div>

            {/* Form section */}
            <div className='w-full md:w-[60%] flex flex-col items-center justify-center'>

                {/* Toggle buttons */}
                <div className='w-full flex items-center justify-center'>

                    {/* SIGNUP BUTTON */}
                    <button
                        onClick={() => {
                            setFormState("signup");
                            localStorage.setItem("formState", "signup");
                        }}
                        className={`p-3 text-xl rounded-l-2xl w-[50%] md:w-[40%] 
            ${formState === "signup"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"} 
        `}
                    >
                        SignUp
                    </button>

                    {/* LOGIN BUTTON */}
                    <button
                        onClick={() => {
                            setFormState("login");
                            localStorage.setItem("formState", "login");
                        }}
                        className={`p-3 text-xl rounded-r-2xl w-[50%] md:w-[40%] 
            ${formState === "login"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"} 
        `}
                    >
                        Login
                    </button>
                </div>


                {/* SIGNUP FORM */}
                {formState === "signup" && (
                    <div className='bg-white w-full md:w-[90%]  rounded-2xl flex flex-col gap-10 p-5 md:p-10 mt-5'>

                        {/* Row 1 */}
                        <div className='flex flex-col md:flex-col w-full justify-between gap-6'>
                            {/* Name */}
                            <div className='flex flex-col w-full md:w-full gap-2'>
                                <label htmlFor="name">Name :</label>
                                <input type="text" className='p-2 border rounded-xl' placeholder='Enter Name' value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>

                            {/* Gender */}
                            <div className='flex w-full md:w-full  items-center gap-4'>
                                <label>Gender :</label>

                                <div className='flex items-center gap-1'>
                                    <input type="radio" name='gender' onChange={(e) => {
                                        setGender('male')
                                    }} id='male' />
                                    <label htmlFor="male">Male</label>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <input type="radio" name='gender' onChange={(e) => {
                                        setGender('female')
                                    }} id='female' />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className='flex flex-col gap-5'>

                            {/* Email */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email">Email :</label>
                                <input type="email" className='p-2 border rounded-xl' placeholder='you@email.com' value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password">Password :</label>
                                <input type="password" className='p-2 border rounded-xl' placeholder='Enter Password' value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>

                        </div>

                        {/* Address */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="address">Address :</label>
                            <textarea className='p-2 border rounded-xl' placeholder='Enter Address' rows='2' value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }}></textarea>
                        </div>

                        {/* Submit */}
                        <button className='bg-blue-500 p-3 rounded-2xl text-xl text-white' onClick={(e) => handleSignUp(e)}>SignUp</button>

                    </div>
                )}

                {/* LOGIN FORM */}
                {formState === "login" && (
                    <div className='bg-white w-full md:w-[90%] rounded-2xl flex flex-col gap-10 p-5 md:p-10 mt-10'>
                        {/* Email */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email :</label>
                            <input type="email" className='p-2 border rounded-xl' placeholder='you@email.com' value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password">Password :</label>
                            <input type="password" className='p-2 border rounded-xl' placeholder='Enter Password' value={password} onChange={(e) => [
                                setPassword(e.target.value)
                            ]} />
                        </div>

                        {/* Submit */}
                        <button className='bg-blue-500 p-3 rounded-2xl text-xl text-white' onClick={(e) => handleLogin(e)}>Login</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserLoginRegister;