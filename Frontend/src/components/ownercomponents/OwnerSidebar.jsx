import React from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerSidebar = ({ activeSection, setActiveSection, setOpenSideBar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { key: "addProduct", label: "Add Product" },
    { key: "editProduct", label: "Edit Product Details" },
    { key: "orders", label: "Orders" },
    { key: "payments", label: "Earning & Payments" },
    { key: "profile", label: "Profile" },
  ];

  const handleClick = (key) => {
    localStorage.setItem("activeSection", key);
    setActiveSection(key);
    setOpenSideBar(false); // ✅ Close menu on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem("ownertoken");
    navigate("/login");
  };

  return (
    <div className="rounded-2xl bg-[#eaf1f1] p-8 w-64">
      <ul className="flex flex-col gap-4 font-semibold">

        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`p-2 rounded-xl text-xl text-center cursor-pointer 
              ${activeSection === item.key
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:text-blue-500"
              }`}
            onClick={() => handleClick(item.key)}
          >
            {item.label}
          </li>
        ))}

        <li
          className="p-2 bg-white rounded-xl text-xl text-center cursor-pointer text-red-500 hover:text-blue-500"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;
