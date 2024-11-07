import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";

// הגדרת הטיפוסים של הפרופס
interface SideProps {
  isOpen: boolean;
  showLogoutModal: () => void; // הוסף את הפרופס
}

const Side: React.FC<SideProps> = ({ isOpen, showLogoutModal }) => {
  return (
    <aside
      className={`fixed top-0 right-0 w-[150px] h-full bg-black text-white p-4 transition-transform duration-500 ease-in-out flex flex-col justify-between ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-75'}`}
      style={{ zIndex: 1000 }}
    >
      {/* לוגו */}
      <div className='flex justify-center items-center mt-3'>
        <img src="../../assets/logo.svg" alt="logo icon" />
      </div>


      {/* קישורים במרכז */}
      <div className='flex flex-col items-center space-y-4'>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/sites"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          Sites
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          Map
        </NavLink>

        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          About Us
        </NavLink>
      </div>

      {/* כפתור התנתקות בתחתית */}
      <div className='flex flex-col items-center mb-2 '>
        <h2 className='mb-4'>Msbit</h2>
        <button
          className='text-gray-500 transition-transform duration-200 transform hover:text-red-800 hover:scale-150 focus:scale-150 focus:outline-none'
          onClick={showLogoutModal} // השתמש בפרופס לפתיחת המודאל
        >
          <TbLogout />
        </button>
      </div>
    </aside>
  );
};

export default Side;