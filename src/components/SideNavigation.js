import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';

function SideNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className={`fixed h-full bg-black z-10 top-0 right-0 overflow-x-hidden pt-16 duration-500 ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      >
        <a href="#" className="text-white text-3xl absolute top-2 right-4" onClick={closeNav}>
          &times;
        </a>
        <Link to="/" className="text-white text-xl block py-4 px-6" onClick={closeNav}>
          Home
        </Link>
        <Link to="/graph" className="text-white text-xl block py-4 px-6" onClick={closeNav}>
          Graph
        </Link>
      </div>

      {/* Button to open the side navigation */}
      <span onClick={openNav} className="cursor-pointer text-lg absolute top-4 right-4">
        <IoIosMenu size={50}></IoIosMenu>
      </span>
    </div>
  );
}

export default SideNavigation;
