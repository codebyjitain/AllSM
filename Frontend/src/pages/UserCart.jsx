import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';

const UserCart = () => {
    const [products, setProducts] = useState(null)
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data.cart);
                setProducts(response.data.cart);

            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCart();
    }, [token]);

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
                <div className='flex flex-col gap-5'>
                    {products.map((product, index) => (
                        <div key={product._id || index} className='flex gap-5'>
                            {/* Left Section: Product Info */}
                            <div className='w-2/3  bg-linear-to-r from-[#f5f7f6] to-[#f0f9f6] rounded-2xl flex gap-10 p-5 items-center'>
                                <div className="w-1/4">
                                    <img
                                        src={`http://localhost:3000/image/${product.productImage}`}
                                        alt={product.name}
                                        className="rounded-3xl w-full"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-5">
                                    <h1 className="text-4xl font-bold">{product.name}</h1>
                                    <h2 className="text-2xl text-green-600">₹ {product.price}</h2>
                                    <p className="text-xl text-gray-600">{product.description}</p>
                                </div>
                            </div>

                            {/* Right Section: Extra info / actions */}
                            <div className='w-1/3 bg-linear-to-r from-[#f5f7f6] to-[#f0f9f6] rounded-2xl flex justify-center items-center'>
                                <button className='bg-green-500 text-white px-6 py-3 rounded-2xl'>Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default UserCart