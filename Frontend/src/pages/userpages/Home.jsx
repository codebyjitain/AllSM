import React from 'react'
import Navbar from '../../components/usercomponents/Navbar'
import ProductPreview from '../../components/usercomponents/ProductPreview'
import Sidebar from '../../components/usercomponents/Sidebar'
import Footer from '../../components/usercomponents/Footer'

const Home = () => {
  

  return (
    <div className='max-w-screen flex flex-col items-center min-h-screen '>

      <div className='w-[90%] mt-5 flex flex-col gap-5'>
        <Navbar />
        <div className='flex gap-5'>
          <Sidebar />
          <ProductPreview />
        </div>
      </div>
      {/* <div className='relative mt-10 h-[200px]'>
        <Footer />
      </div> */}
    </div>
  )
}

export default Home