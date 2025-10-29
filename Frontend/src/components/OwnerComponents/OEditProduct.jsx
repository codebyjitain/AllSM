import React from 'react'

const OEditProduct = () => {
  return (
    <div className='bg-linear-to-r rounded-2xl gap-4 from-[#e1ebed] to-[#fefeff] flex items-center flex-col'>
      <div className="bg-white w-[90%]  rounded-3xl flex gap-10 p-10 items-center">
        <div className="w-1/4">
          <img
            className="rounded-3xl"
          />
        </div>
        <div className="w-1/3 flex flex-col gap-5">
          <input type="text" className='text-4xl font-bold' value="Product 1" />
          <input type='text' value="200" className="text-2xl text-green-600" />
          <textarea className="text-xl text-gray-600" value="da fafna faifn afiaf afa fa fa"></textarea>
        </div>
        <button onClick={(e)=> handleSave(e)} className='bg-blue-300 p-2 rounded-2xl
        text-2xl'>Save</button>
      </div>
    </div>
  )
}

export default OEditProduct