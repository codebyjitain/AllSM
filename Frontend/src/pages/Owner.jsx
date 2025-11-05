import React, { useEffect, useState } from 'react'
import OwnerSidebar from '../components/ownercomponents/OwnerSidebar'
import OAddProduct from '../components/ownercomponents/OAddProduct';
import OEditProduct from '../components/ownercomponents/OEditProduct';
import OViewProducts from '../components/ownercomponents/OViewProducts';
import ODeleteProduct from '../components/ownercomponents/ODeleteProduct';
import OSetStock from '../components/ownercomponents/OSetStock';
import OOrders from '../components/ownercomponents/OOrders';
import OPayments from '../components/ownercomponents/OPayments';
import OProfile from '../components/ownercomponents/OProfile';
import ONavbar from '../components/ownercomponents/ONavbar';

const Owner = () => {
  const [activeSection, setActiveSection] = useState('addProduct');

  useEffect(() => {
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'addProduct':
        return <OAddProduct />;
      case 'editProduct':
        return <OEditProduct />; // Assume EditProduct is another component
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