import React, { useState } from 'react'
import OwnerSidebar from '../components/OwnerComponents/OwnerSidebar'
import OAddProduct from '../components/OwnerComponents/OAddProduct';
import OEditProduct from '../components/OwnerComponents/OEditProduct';
import OViewProducts from '../components/OwnerComponents/OViewProducts';
import ODeleteProduct from '../components/OwnerComponents/ODeleteProduct';
import OSetStock from '../components/OwnerComponents/OSetStock';
import OOrders from '../components/OwnerComponents/OOrders';
import OPayments from '../components/OwnerComponents/OPayments';
import OProfile from '../components/OwnerComponents/OProfile';
import ONavbar from '../components/OwnerComponents/ONavbar';

const Owner = () => {
  const [activeSection, setActiveSection] = useState('addProduct');

  const renderSection = () => {
    switch (activeSection) {
      case 'addProduct':
        return <OAddProduct />;
      case 'editProduct':
        return <OEditProduct />; // Assume EditProduct is another component
      case 'viewProducts':
        return <OViewProducts />; // Assume ViewProducts is another component
      case 'deleteProduct':
        return <ODeleteProduct />; // Assume DeleteProduct is another component
      case 'setStock':
        return <OSetStock />; // Assume SetStock is another component
      case 'orders':
        return <OOrders />; // Assume Orders is another component
      case 'payments':
        return <OPayments />; // Assume Payments is another component
      case 'profile':
        return <OProfile />; // Assume Profile is another component
      default:
        return <OAddProduct />;
    }
  }
  return (
    <div className='min-h-screen bg-linear-to-b flex flex-col items-center from-[#eef1db] to-[#d1dcdd]'>
      <div className='w-[90%] mt-5 flex flex-col gap-5'>
        <ONavbar />
        <div className='flex gap-10'>
          <div className='w-1/5'>
            <OwnerSidebar setActiveSection={setActiveSection} />
          </div>
          <div className='w-4/5'>
            {renderSection()}
          </div>
        </div>
      </div>



    </div>
  )
}

export default Owner