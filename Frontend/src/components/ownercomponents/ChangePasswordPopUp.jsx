import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/slices/ownerSlice';
import {toast } from 'react-toastify'


const ChangePasswordPopUp = ({ setOpenPasswordPopUp }) => {
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleEdit = async (e) => {
        e.preventDefault()
        try{

            const passwordData = {
                'oldPassword': oldPassword,
                'newPassword': newPassword
            }
            
            const check = await  dispatch(changePassword(passwordData))
            if(check.payload?.status === 200){
                setOpenPasswordPopUp(false)
                toast.success("Password Change Successfully")

            }
            else if(check.payload?.status === 401){
                toast.error(check.payload.message)
            }
            else if(check.payload?.status ===400){
                toast.error(check.payload.message)
            }
        }catch(err){
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-[#eaf1f1] flex flex-col  items-center p-5 rounded-2xl shadow-lg w-[90%] max-w-md">

                <h2 className='text-2xl font-bold mb-4'>Change Password</h2>
                <div className='flex flex-col  w-full gap-5'>
                    <div className='flex flex-col bg-white p-2 gap-2 rounded-2xl'>

                        <label htmlFor="oldpassword" className='text-lg font-bold'>Old Password :</label>
                        <input className="border p-2 rounded-xl" type="text" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => {
                            setOldPassword(e.target.value)
                        }} />
                    </div>
                    <div className='flex flex-col bg-white p-2 gap-2 rounded-2xl'>

                        <label htmlFor="newpassword" className='text-lg font-bold'>New Password :</label>
                        <input className="border p-2 rounded-xl" type="text" placeholder="Enter New Password" value={newPassword} onChange={(e) => {
                            setNewPassword(e.target.value)
                        }} />
                    </div>

                    <div className="flex w-full justify-between mt-4 gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setOpenPasswordPopUp(false)
                            }}
                            className="px-4 py-2 bg-gray-300 text-white rounded-xl w-full"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={(e) => handleEdit(e)}
                            className="px-4 py-2 bg-blue-600 w-full text-white rounded-xl"
                        >
                            Change Password
                        </button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default ChangePasswordPopUp;


