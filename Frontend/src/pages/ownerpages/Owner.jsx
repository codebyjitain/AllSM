import React, { useEffect, useState } from 'react';
import OwnerSidebar from '../../components/ownercomponents/OwnerSidebar';
import OAddProduct from '../../components/ownercomponents/OAddProduct';
import OEditProduct from '../../components/ownercomponents/OEditProduct';
import OOrders from '../../components/ownercomponents/OOrders';
import OPayments from '../../components/ownercomponents/OPayments';
import OProfile from '../../components/ownercomponents/OProfile';
import ONavbar from '../../components/ownercomponents/ONavbar';

const Owner = () => {
  const [activeSection, setActiveSection] = useState('addProduct');
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('activeSection');
    if (saved) setActiveSection(saved);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'addProduct': return <OAddProduct />;
      case 'editProduct': return <OEditProduct />;
      case 'orders': return <OOrders />;
      case 'payments': return <OPayments />;
      case 'profile': return <OProfile />;
      default: return <OAddProduct />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#eef1db] to-[#d1dcdd] flex flex-col items-center">
      <div className="w-[90%] mt-5 flex flex-col gap-5">

        <ONavbar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />

        <div className="flex gap-10">

          {/* ✅ Sidebar - Always visible on desktop, toggled on mobile */}
          <div
            className={`
              fixed left-0 h-auto z-50 bg-[#eaf1f1] shadow-xl rounded-2xl transform transition-transform duration-300
              ${openSideBar ? "translate-x-10" : "-translate-x-[500px]"}
              md:relative md:translate-x-0 md:block md:h-auto md:shadow-none md:bg-transparent
            `}
          >
            <OwnerSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setOpenSideBar={setOpenSideBar}
            />
          </div>

          {/* ✅ Main Content */}
          <div className="w-full md:w-4/5">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
