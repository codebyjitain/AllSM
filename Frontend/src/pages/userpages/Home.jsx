import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/usercomponents/Sidebar';
import Navbar from '../../components/usercomponents/Navbar'
import ProductPreview from '../../components/usercomponents/ProductPreview';

const Home = () => {
  // const [activeSection, setActiveSection] = useState('addProduct');
  const [openSideBar, setOpenSideBar] = useState(false);

  // useEffect(() => {
  //   const saved = localStorage.getItem('activeSection');
  //   if (saved) setActiveSection(saved);
  // }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#eef1db] to-[#d1dcdd] flex flex-col items-center">
      <div className="w-[90%] mt-5 flex flex-col gap-5">

        <Navbar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />

        <div className="flex gap-10">

          {/* ✅ Sidebar - Always visible on desktop, toggled on mobile */}
          <div
            className={`
              fixed left-0 h-auto z-50 bg-[#eaf1f1] shadow-xl transform transition-transform duration-300 rounded-xl ml-5
              ${openSideBar ? "translate-x-0" : "-translate-x-[500px]"}
              md:relative md:translate-x-0 md:block md:h-auto md:shadow-none md:bg-transparent
            `}
          >
            <Sidebar
              // activeSection={activeSection}
              // setActiveSection={setActiveSection}
              setOpenSideBar={setOpenSideBar}
            />
          </div>

          {/* ProductPreview */}
          <div>
              <ProductPreview/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
