import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerByToken } from '../../redux/slices/ownerSlice';

const ONavbar = () => {
    const { owner , status, error } = useSelector((state) => state.owner);
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(getOwnerByToken())
    }, []);

    useEffect(() => {
        if (owner && owner.name) {
            setName(owner.name);
        }
    }, [owner]);
    
    return (
        
        <div className=' h-16 flex justify-between p-3 bg-[#eaf1f1] rounded-4xl'>
            
            <div className='bg-[#e4eaec] flex items-center p-3 rounded-4xl'>
                Logo
            </div>

            <div className='flex items-center'>
                 <h2 className='text-xl capitalize'>Hi , {name}</h2>
            </div>
            <div className='flex items-center'>
                <h2 className='text-xl'>Owner DashBoard</h2>
            </div>


        </div>
    )
}

export default ONavbar