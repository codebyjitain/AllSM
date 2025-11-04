import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProductPreview = () => {
    const [products, setProducts] = useState([])
    const [clickProduct, setClickProduct] = useState(null)

    const navigate = useNavigate();
    useEffect(() => {
        // Fetch product data from an API or database
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products')
                const data = response.data
                setProducts(data)
                console.log(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])

    const handleClick = (id, e) => {
        e.preventDefault();
        navigate(`/product/${id}`);
    }

    

    return (
        <div className='w-full flex flex-col gap-5'>
            {products.map((item, index) => (
                <div
                    key={item._id || index} 
                    onClick={(e) => handleClick(item._id, e)}
                    className='bg-linear-to-r w-full p-2 flex items-center from-[#f5f7f6] to-[#f0f9f6] rounded-3xl'>
                    <div className='w-full flex mt-2'>
                        <div className="w-1/3 flex items-center flex-col justify-center">
                            <img
                                className="w-[200px] mb-4 rounded-4xl"
                                src={`http://localhost:3000/image/${item.productImage}`}
                                alt={item.name}
                            />
                        </div>

                        <div className='w-1/3 p-5 flex flex-col gap-3'>
                            <h2 className='text-2xl font-bold'>{item.name}</h2>
                            <h3 className='text-xl'>₹ {item.price}</h3>
                            <p className='text-md h-30 overflow-hidden'>{item.description}</p>
                            <h2>.....</h2>
                        </div>

                        
                    </div>
                </div>
            ))}
        </div>



    )
}

export default ProductPreview