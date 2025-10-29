import React from 'react'

const ONavbar = () => {
    return (
        <div className=' h-16 flex justify-between p-3 bg-[#eaf1f1] rounded-4xl'>

            <div className='bg-[#e4eaec] flex items-center p-3 rounded-4xl'>
                Logo
            </div>

            <div className='flex items-center'>
                 <h2 className='text-xl'>Hi , Profile Name</h2>
            </div>
            <div className='flex items-center'>
                <h2 className='text-xl'>Owner DashBoard</h2>
            </div>


        </div>
    )
}

export default ONavbar