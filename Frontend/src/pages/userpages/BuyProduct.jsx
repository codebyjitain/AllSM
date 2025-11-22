import React from 'react'
import ProductCard from '../../components/usercomponents/ProductCard'
import { useParams } from 'react-router-dom'
import ProductPriceCalculation from '../../components/usercomponents/ProductPriceCalculation'

const BuyProduct = () => {
  const { id } = useParams()

  return (
    <div className='w-full min-h-screen flex flex-col  items-center'>
      <div className='w-[90%] bg-[#eaf1f1] p-4 flex md:flex-row md:justify-between flex-col gap-5 mt-10 rounded-2xl'>
        <div className='md:w-1/3'>
          <ProductCard id={id} />
        </div>
        <div className='flex w-full flex-col gap-7'>
          <ProductPriceCalculation id={id} />
          <div>
            <button className='w-full  bg-green-600 p-2 rounded-xl text-lg text-white'>CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyProduct