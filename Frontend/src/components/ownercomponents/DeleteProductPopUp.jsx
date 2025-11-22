import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'


const ChangePasswordPopUp = ({ id }) => {
    const dispatch = useDispatch()

    const handleDelete = (e)=>{
        e.preventDefault()
        
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-[#eaf1f1] flex flex-col  items-center p-5 rounded-2xl shadow-lg w-[90%] max-w-md">

                <h2 className='text-2xl font-bold mb-4'>Delete Product</h2>
                <div className='flex flex-col  w-full gap-5'>


                    <button
                        onClick={(e) => handleDelete(e)}
                        className="px-4 py-2 bg-red-500 w-full text-white rounded-xl"
                    >
                        Delete Product
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setOpenPasswordPopUp(false)
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl w-full"
                    >
                        Cancel
                    </button>

                </div>


            </div>

        </div>
    );
};

export default ChangePasswordPopUp;


