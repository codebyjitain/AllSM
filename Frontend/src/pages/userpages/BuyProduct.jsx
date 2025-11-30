import React, { useState } from 'react'
import ProductCard from '../../components/usercomponents/ProductCard'
import { useParams } from 'react-router-dom'
import ProductPriceCalculation from '../../components/usercomponents/ProductPriceCalculation'
import { useDispatch } from 'react-redux'
import { createOrder } from '../../redux/slices/orderSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const BuyProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [totalAmount, setTotalAmount] = useState(0)

  
  const handleCheckOut = async (e) => {
    e.preventDefault()
    try {
      const orderData = {
        'productId': id,
        totalAmount
      }
      const check = await dispatch(createOrder(orderData))
      console.log(check);
      if (check.payload?.status !== 201) {
        toast.error(check.payload.message)
      }
      else {
        toast.success("Order Placed")
        navigate("/user/orders")
      }
    } catch (error) {
      toast.error("Something Went Wrong")
    }

  }
  return (
    <div className='w-full min-h-screen flex flex-col  items-center'>
      <div className='w-[90%] bg-[#eaf1f1] p-4 flex md:flex-row md:justify-between flex-col gap-5 mt-10 rounded-2xl'>
        <div className='md:w-1/3'>
          <ProductCard id={id} />
        </div>
        <div className='flex w-full flex-col gap-7'>
          <ProductPriceCalculation id={id} setTotalAmount={setTotalAmount}/>
          <div>
            <button className='w-full  bg-green-600 p-2 rounded-xl text-lg text-white' onClick={(e) => handleCheckOut(e)}>CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyProduct