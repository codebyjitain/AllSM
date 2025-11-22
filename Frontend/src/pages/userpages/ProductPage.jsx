import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/usercomponents/Navbar'
import { getProductById } from '../../redux/slices/productSlice'
import { addToCart } from '../../redux/slices/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const ok = async () => {
            const checkProduct = await dispatch(getProductById(id))
            setProduct(checkProduct.payload.data)
        }
        ok()
    }, [dispatch])


    const handleBuy = (e) => {
        e.preventDefault()
        navigate(`/checkout/${id}`)
    }

    const handleCart = async (e) => {
        e.preventDefault()
        const check = await dispatch(addToCart(id))
        if (check.payload?.status === 200) {
            toast.success(check.payload.data.message)
        }
        else {
            if (check.payload?.status === 401) {
                toast.error(check.payload.message)
            }
            else if (check.payload?.status === 400) {
                toast.error(check.payload.message)

            }
            else {
                toast.error(check.payload.message)
            }
        }
    }

    // // 🟡 Render loading state until product data arrives
    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-2xl font-semibold">Loading product...</h2>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <div className='w-[90%] mt-5'>
                <Navbar />
            </div>
            <div className='bg-[#eaf1f1] w-[90%] mt-5 flex flex-col md:flex-row  gap-5 pb-10 mb-10 rounded-2xl items-center p-4'>
                <div>
                    <img className='rounded-2xl md:w-[500px] md:h-[400px] w-[350px] h-[250px]' src={product.productImage} alt="" />
                </div>
                <div className='bg-white p-4 flex flex-col gap-4 rounded-xl'>
                    <h2 className='text-2xl font-bold'>{product.brand}</h2>
                    <h2 className='text-xl'>{product.name}</h2>
                    <h2 className='text-xl italic'>{product.discount_price}</h2>
                    <h3 className='line-through text-red-600'>{product.price}</h3>

                    <pre>{product.specifications}</pre>


                    <p className='text-md'>{product.description}</p>

                    <div className='w-full flex flex-col md:flex-row gap-2'>

                        <button className='w-full text-lg  bg-green-500 p-2 rounded-xl text-white' onClick={(e) => handleBuy(e)}>Buy Now</button>
                        <button className='w-full text-lg  bg-zinc-500 p-2 rounded-xl text-white' onClick={(e) => handleCart(e)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
