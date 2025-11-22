import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductById } from '../../redux/slices/productSlice'

const ProductCard = ({id}) => {
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const ok = async () => {
            const checkProduct = await dispatch(getProductById(id))
            setProduct(checkProduct.payload.data)
        }
        ok()
    }, [dispatch])
    return (
        <div className='w-full h-full bg-white p-4 rounded-xl flex flex-col gap-4   items-center'>
            <div><img src={product?.productImage} alt="" /></div>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>{product?.brand}</h2>
                <h2 className='text-lg italic capitalize'>{product?.name}</h2>
            </div>
        </div>
    )
}

export default ProductCard