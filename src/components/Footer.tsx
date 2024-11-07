import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-800 text-white flex flex-col sm:flex-row justify-between items-center p-6 sm:p-4'>
      <div className='flex flex-col sm:flex-row gap-3 items-center'>
        <h2 className='hover:underline cursor-pointer'>MSbit Software</h2>
        <NavLink to="/analytics" className='flex items-center gap-2 hover:underline cursor-pointer'>Analytics<img className='h-[16px] w-5' src="../../assets/Analytics1.png" alt="Analytics" /></NavLink>
        <NavLink to="/website" className='flex gap-2 items-center hover:underline cursor-pointer'>Website <FaExternalLinkAlt /></NavLink>
      </div>
      
      <h3 className='text-sm flex gap-2 items-center mt-4 sm:mt-0 '>MTF Sacurety <LiaCopyrightSolid /> 2024</h3>
    </footer>
  );
}

export default Footer;
