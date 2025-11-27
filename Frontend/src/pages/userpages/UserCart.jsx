import React, { use, useEffect, useState } from 'react'
import Navbar from '../../components/usercomponents/Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userCart } from '../../redux/slices/userSlice';
import { CircleMinus, CirclePlus } from 'lucide-react';

const UserCart = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const ok = async () => {
            const check = await dispatch(userCart())
            setProducts(check.payload.data.cart)
        }
        ok()
    }, [dispatch]);

    const handleRemove = async (id,e) => {
        e.preventDefault()
    }

    const handleBuy = (e) => {
        e.preventDefault()
        navigate(`/checkout/${id}`)
    }


    if (products === null) {
        return (
            <div className='max-w-screen flex justify-center min-h-screen'>

                <div className='w-[90%] mt-5 flex flex-col gap-5'>
                    <Navbar />
                    <div className="flex items-center justify-center h-screen">
                        <h2 className="text-6xl font-semibold text-white italic -rotate-30">The Cart is Empty</h2>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className='max-w-screen flex justify-center min-h-screen'>
            <div className='w-[90%] mt-5 flex flex-col gap-5'>
                <Navbar />
                <div className='flex flex-col gap-5 items-center'>
                    {products.map((product, index) => (
                        <div key={index} className='flex gap-3 md:w-2/3 items-center bg-white p-4 flex-col rounded-2xl md:flex-row'>
                            {/* Left Section: Product Info */}
                            <div className='flex md:w-3/4 justify-between'>
                                <div className='w-2/3 flex flex-col gap-5'>
                                    <img className='w-[250px] md:w-[400px]' src={product.productImage} alt="" />
                                </div>

                                <div className='w-1/3 md:w-2/3 flex flex-col gap-2'>
                                    <h2 className='text-2xl font-bold'>{product.brand}</h2>
                                    <h2 className='text-lg italic capitalize'>{product.name}</h2>
                                    <h2 className=''>₹{product.price}</h2>

                                    {/* quantity */}
                                    <div>
                                        <label htmlFor="">Quantity : </label>
                                        <div className='flex w-fit rounded-xl gap-2 p-2 bg-[#eaf1f1]'>
                                            <CircleMinus />
                                            <h2>1</h2>
                                            <CirclePlus />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Product Image */}

                            </div>
                            <div className='w-full flex md:w-1/4 flex-col gap-3 '>
                                <button className='bg-red-500 w-full p-2 rounded-xl text-white text-lg' onClick={(e) => handleRemove(product._id,e)}>Remove</button>
                                <button className='bg-green-500 w-full p-2 rounded-xl text-white text-lg' onClick={(e) => handleBuy(e)}>Buy</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default UserCart