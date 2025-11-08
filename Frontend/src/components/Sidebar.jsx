import React from 'react'

const Sidebar = () => {
  return (
    <div className='max-h-150 w-[20%] bg-[#eaf1f1]  rounded-3xl p-5 flex flex-col gap-5'>   
        <h2 className='text-2xl'>Select Product Type:</h2>
        <ul className='flex flex-col items-center gap-5 text-xl'>
          
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Electronics">Electronics</li>
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Clothing">Clothing</li>
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Accessories">Accessories</li>
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Home">Home</li>
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Grocery">Grocery</li>
          <li className='p-2 bg-white w-full rounded-2xl text-center hover:text-blue-500 cursor-pointer' value="Other">Other</li>
        </ul>
    </div>
  )
}

export default Sidebar