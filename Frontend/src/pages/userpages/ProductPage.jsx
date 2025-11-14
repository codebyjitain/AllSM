import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/usercomponents/Navbar'

const ProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`)
                setProduct(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }

        fetchProduct()
    }, [id])

    const handleBuy = async (e) => {
        
    }

    const handleAddtoCart = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/users/addtocart', { productId: id, token: token });
            console.log(response.data)
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }


    // 🟡 Render loading state until product data arrives
    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-2xl font-semibold">Loading product...</h2>
            </div>
        )
    }

    return (
        <div className="max-w-screen flex justify-center min-h-screen">
            <div className="w-[90%] mt-5 flex flex-col gap-5">
                <Navbar />
                <div>
                    <div className="bg-linear-to-r from-[#f5f7f5] to-[#eef8f4] w-full min-h-[500px] rounded-3xl flex gap-10 p-10 items-center">
                        <div className="w-1/4">
                            <img
                                src={`http://localhost:3000/image/${product?.productImage}`}
                                alt={product?.name}
                                className="rounded-3xl"
                            />
                        </div>
                        <div className="w-1/3 flex flex-col gap-5">
                            <h1 className="text-4xl font-bold">{product.name}</h1>
                            <h2 className="text-2xl text-green-600">₹ {product.price}</h2>
                            <p className="text-xl text-gray-600">{product.description}</p>
                        </div>
                        <div className='w-1/3 flex flex-col gap-3 text-xl justify-center'>
                            <button className='p-2 bg-green-500 rounded-4xl' onClick={(e) => handleBuy(e)}>Buy</button>
                            <button className='p-2 bg-black text-white rounded-4xl' onClick={(e) => handleAddtoCart(e)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
