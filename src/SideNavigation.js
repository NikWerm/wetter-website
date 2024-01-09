import { useState } from 'react';
import { IoIosMenu } from "react-icons/io";

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
      {/* Side Navigation */}
      <div
        className={`fixed h-full bg-black z-10 top-0 right-0 overflow-x-hidden pt-16 duration-500 ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      >
        <a href="#" className="text-white text-3xl absolute top-2 right-4" onClick={closeNav}> 
          &times;
        </a>
        <a href="#" className="text-white text-xl block py-4 px-6" onClick={closeNav}>
          Graph
        </a>
      </div>

      {/* Button to open the side navigation */}
      <span onClick={openNav} className="cursor-pointer text-lg absolute top-1 right-4">
        <IoIosMenu size={50}></IoIosMenu>
      </span>
    </div>
  );
}

export default SideNavigation;
