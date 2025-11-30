import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginOwner, registerOwner } from "../../redux/slices/ownerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OwnerLoginRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formState, setFormState] = useState("signup");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [store_name, setStore_name] = useState('')
    const [store_address, setStore_address] = useState('')
    const [bussiness_category, setBussiness_category] = useState('')


    useEffect(() => {
        const saved = localStorage.getItem("ownerFormState");
        if (saved) setFormState(saved);
    }, [localStorage.getItem("ownerFormState")]);


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const ownerData = { name, email, password, gender, store_name, store_address, bussiness_category };
            await dispatch(registerOwner(ownerData));

            setName("");
            setEmail("");
            setPassword("");
            setGender("");
            setStore_name("");
            setStore_address("");
            setBussiness_category("");
            localStorage.setItem("ownerFormState", "login");
            toast.success("Owner Registered");
        } catch (err) {
            toast.error("Registration Failed");
            console.log(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            await dispatch(loginOwner(loginData));
            navigate("/owner");
            toast.success("Login Success");
        } catch (err) {
            toast.error("Login Failed");
        }
    };

    return (
        <div className="w-screen flex flex-col md:flex-row justify-between p-4 md:p-0">
            <div className="w-full md:w-[30%] flex items-center justify-center mb-6 md:mb-0">
                <img src="/src/assets/owner.png" className="w-[90%] rounded-2xl" alt="" />
            </div>

            <div className="w-full md:w-[60%] flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center">

                    {/* OWNER SIGNUP */}
                    <button
                        onClick={() => {
                            setFormState("signup");
                            localStorage.setItem("ownerFormState", "signup");
                        }}
                        className={`p-3 text-xl rounded-l-2xl w-[50%] md:w-[40%]
      ${formState === "signup"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"}
    `}
                    >
                        Owner SignUp
                    </button>

                    {/* OWNER LOGIN */}
                    <button
                        onClick={() => {
                            setFormState("login");
                            localStorage.setItem("ownerFormState", "login");
                        }}
                        className={`p-3 text-xl rounded-r-2xl w-[50%] md:w-[40%]
      ${formState === "login"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"}
    `}
                    >
                        Owner Login
                    </button>

                </div>

                {/* Owner SignUp */}
                {formState === "signup" && (
                    <div className="bg-white w-full md:w-[90%] rounded-2xl flex flex-col gap-10 p-5 md:p-10 mt-5 mb-10">
                        <div className="flex flex-col md:flex-col w-full justify-between gap-6">
                            <div className="flex flex-col w-full md:w-full gap-2">
                                <label htmlFor="name">Name :</label>
                                <input
                                    type="text"
                                    className="p-2 border rounded-xl"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex w-full md:w-full items-center gap-4">
                                <label>Gender :</label>

                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="ownerGender"
                                        id="male"
                                        onChange={() => setGender("male")}
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="ownerGender"
                                        id="female"
                                        onChange={() => setGender("female")}
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email :</label>
                                <input
                                    type="email"
                                    className="p-2 border rounded-xl"
                                    placeholder="owner@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password :</label>
                                <input
                                    type="password"
                                    className="p-2 border rounded-xl"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="store_name">Store Name :</label>
                            <input
                                type="text"
                                className="p-2 border rounded-xl"
                                placeholder="Enter Store Name"
                                value={store_name}
                                onChange={(e) => setStore_name(e.target.value)}
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label htmlFor="store_address">Store Address :</label>
                            <textarea
                                className="p-2 border rounded-xl"
                                placeholder="Enter Store Address"
                                rows="2"
                                value={store_address}
                                onChange={(e) => setStore_address(e.target.value)}
                            ></textarea>
                        </div>
{/* bussiness category */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="business_category">Business Category :</label>

                            <select
                                id="business_category"
                                className="p-2 border rounded-xl bg-white"
                                value={bussiness_category}
                                onChange={(e) => setBussiness_category(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="any">Any</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion & Clothing</option>
                                <option value="grocery">Grocery</option>
                                <option value="home">Home & Furniture</option>
                                <option value="beauty">Beauty & Personal Care</option>
                                <option value="sports">Sports</option>
                                <option value="books">Books</option>
                                <option value="toys">Toys & Games</option>
                                <option value="automotive">Automotive</option>
                                <option value="others">Others</option>
                            </select>
                        </div>


                        <button
                            className="bg-blue-500 p-3 rounded-2xl text-xl text-white"
                            onClick={handleSignUp}
                        >
                            SignUp
                        </button>
                    </div>
                )}


                {/* Owner Login */}
                {formState === "login" && (
                    <div className="bg-white w-full md:w-[90%] rounded-2xl flex flex-col gap-10 p-5 md:p-10 mt-10">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email :</label>
                            <input
                                type="email"
                                className="p-2 border rounded-xl"
                                placeholder="owner@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password :</label>
                            <input
                                type="password"
                                className="p-2 border rounded-xl"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="bg-blue-500 p-3 rounded-2xl text-xl text-white"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerLoginRegister;