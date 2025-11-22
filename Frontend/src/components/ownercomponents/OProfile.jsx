import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOwner, verifyOwner } from '../../redux/slices/ownerSlice'
import ChangePasswordPopUp from './ChangePasswordPopUp'
import { toast } from 'react-toastify'


const OProfile = () => {
  const { owner, status, error } = useSelector((state) => state.owner)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [store_name, setStore_name] = useState('')
  const [store_address, setStore_address] = useState('')
  const [bussiness_category, setBussiness_category] = useState('')


  const [editable, setEditable] = useState(false)
  const [openPasswordPopUp, setOpenPasswordPopUp] = useState(false)
  useEffect(() => {
    dispatch(verifyOwner())
  }, [])

  useEffect(() => {
    if (owner?.name) {
      setName(owner.name);
    }
    if (owner?.email) {
      setEmail(owner.email)
    }
    if (owner?.store_name) {
      setStore_name(owner.store_name)
    }
    if (owner?.store_address) {
      setStore_address(owner.store_address)
    }
    if (owner?.bussiness_category) {
      setBussiness_category(owner.bussiness_category)
    }
  }, [owner]);

  const handleEdit = (e) => {
    e.preventDefault()
    setEditable(true)
  }

  const handleChangePassword = () => {
    setOpenPasswordPopUp(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEditable(false)
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {

      const ownerData = {
        'name': name,
        'email': email,
        'store_name': store_name,
        'store_address': store_address,
        'bussiness_category': bussiness_category
      }

      const check = await dispatch(updateOwner(ownerData))

      if (check.payload?.status === 200) {
        toast.success(check.payload.data.message)

        setEditable(false)
      }
      else {
        toast.error(check.payload.data.message)
      }

    } catch (err) {
      toast.error("Fat Gya")
    }

  }


  return (
    <div className='flex w-full flex-col bg-[#eaf1f1] p-4 rounded-2xl'>
      <h1 className='w-full mb-10 text-center text-2xl font-bold'>Profile</h1>
      <div className='flex flex-col md:flex-row gap-5'>
        <div className='flex flex-col w-full gap-5'>

          {/* name */}
          <div className={`flex flex-col gap-2 p-2 rounded-2xl ${editable ? "bg-white" : "opacity-50"}`}>
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

          <div className={`flex flex-col gap-2 p-2 rounded-2xl ${editable ? "bg-white" : "opacity-50"}`}>
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
          <div className={`flex flex-col gap-2 p-2 rounded-2xl ${editable ? "bg-white" : "opacity-50"}`}>
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

          <div className={`flex flex-col gap-2 p-2 rounded-2xl ${editable ? "bg-white" : "opacity-50"}`}>
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

        </div>
        <div className='flex flex-col w-full gap-5'>

          {/* bussiness category */}
          <div className={`flex flex-col gap-2 p-2 rounded-2xl ${editable ? "bg-white" : "opacity-50"}`}>
            <label htmlFor="business_category">Business Category :</label>

            <select
              id="business_category"
              className="p-2 border rounded-xl"
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
              {/* password button */}
              <button className='w-full bg-yellow-400 p-4 rounded-2xl text-white text-xl' onClick={(e) =>
                handleChangePassword(e)
              }>Change Password</button>

              {openPasswordPopUp && <ChangePasswordPopUp setOpenPasswordPopUp={setOpenPasswordPopUp} />}



              <button className='w-full bg-green-500 p-4 rounded-2xl text-white text-xl' onClick={(e) => handleUpdate(e)}>Update</button>


              <button className='w-full bg-red-500 p-4 rounded-2xl text-white text-xl' onClick={(e) => handleCancel(e)}>Cancel</button>
            </div>

          }

          {
            !editable && <button className='w-full p-4 bg-blue-500 rounded-2xl text-xl text-white' onClick={(e) => handleEdit(e)}>
              Edit Details
            </button>
          }

        </div>
      </div>
    </div>
  )
}

export default OProfile