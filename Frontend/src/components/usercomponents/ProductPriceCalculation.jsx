import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductById } from '../../redux/slices/productSlice'

const ProductPriceCalculation = ({ id }) => {

    const dispatch = useDispatch()

    const [price, setPrice] = useState(null)
    const [discounted_price, setDiscountedPrice] = useState(null)

    useEffect(() => {
        const ok = async () => {
            const checkProduct = await dispatch(getProductById(id))
            console.log(checkProduct)
            setPrice(checkProduct.payload.data.price)
            setDiscountedPrice(checkProduct.payload.data.discount_price)
        }
        ok()
    }, [dispatch])

    return (
        <div className='w-full bg-white flex flex-col gap-2 text-lg p-4 rounded-xl'>
            <h2 className='line-through'>MRP : {price}</h2>
            <h2>Discount Price : {discounted_price}</h2>
            <h2>GST(18%) : {discounted_price * 0.18}</h2>
            <h2 className='text-blue-600'>Total : {discounted_price + (discounted_price * 0.18)}</h2>
        </div>
    )
}

export default ProductPriceCalculation