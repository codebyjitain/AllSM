import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { verifyOwner } from '../../redux/slices/ownerSlice'
const OProfile = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [store_name, setStore_name] = useState('')
  const [store_address, setStore_address] = useState('')
  const [bussiness_category, setBussiness_category] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    dispatch(verifyOwner())
  }, [])

  const handleEdit = (e)=>{
    e.preventDefault()
    setEditable(true)
  }

  return (
    <div className='flex w-full flex-col bg-[#eaf1f1] p-4 rounded-2xl'>
      <h1 className='w-full text-center text-2xl font-bold'>Profile</h1>
      <div className='flex flex-col gap-5'>
        {/* name */}
        <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            className="p-2 border rounded-xl"
            placeholder="Enter Name"
            value={name}
            disabled={!editable}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* email */}

        <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            className="p-2 border rounded-xl"
            placeholder="owner@email.com"
            value={email}
            disabled={!editable}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* store_name */}
        <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl">
          <label htmlFor="store_name">Store Name :</label>
          <input
            type="text"
            className="p-2 border rounded-xl"
            placeholder="Enter Store Name"
            value={store_name}
            disabled={!editable}
            onChange={(e) => setStore_name(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl">
          <label htmlFor="store_address">Store Address :</label>
          <textarea
            className="p-2 border rounded-xl"
            placeholder="Enter Store Address"
            rows="2"
            value={store_address}
            disabled={!editable}
            onChange={(e) => setStore_address(e.target.value)}
          ></textarea>
        </div>
        {/* bussiness category */}
        <div className="flex flex-col gap-2 bg-white p-2 rounded-2xl">
          <label htmlFor="business_category">Business Category :</label>

          <select
            id="business_category"
            className="p-2 border rounded-xl bg-white"
            value={bussiness_category}
            disabled={!editable}
            onChange={(e) => setBussiness_category(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="any">Any</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion & Clothing</option>
            <option value="grocery">Grocery</option>
            <option value="home">Home & Furniture</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="toys">Toys & Games</option>
            <option value="automotive">Automotive</option>
            <option value="others">Others</option>
          </select>
        </div>

        {editable && 
          <div className='flex flex-col gap-5'>
            <button className='w-full bg-yellow-400 p-4 rounded-2xl text-white text-xl'>Change Password</button>
            <button className='w-full bg-green-500 p-4 rounded-2xl text-white text-xl'>Update</button>
            <button className='w-full bg-red-500 p-4 rounded-2xl text-white text-xl'>Cancel</button>
          </div>

        }

        {
          !editable && <button className='w-full p-4 bg-blue-500 rounded-2xl text-xl text-white' onClick={(e)=> handleEdit(e)}>
        Edit Details
      </button>
        }
      
      </div>
    </div>
  )
}

export default OProfile