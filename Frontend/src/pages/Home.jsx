import React from 'react'
import Navbar from '../components/Navbar'
import ProductPreview from '../components/ProductPreview'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='max-w-screen flex justify-center min-h-screen '>

      <div className='w-[90%] mt-5 flex flex-col gap-5'>
        <Navbar />
        <div className='flex gap-5'>
          <Sidebar />
          <ProductPreview />
        </div>
      </div>
    </div>
  )
}

export default Home