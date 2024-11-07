import React, { useEffect, useState } from 'react';
import { LuMenu } from 'react-icons/lu';

interface HeaderProps {
  toggleAside: () => void;
  color?: string;  // Optional color prop for customization
}

const Header: React.FC<HeaderProps> = ({ toggleAside, color = 'bg-gray-800' }) => {
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("user") || "";
  });

  useEffect(() => {
    const storedUserName = localStorage.getItem("user");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // קובע את צבע הטקסט בהתאם לצבע העדר
  const textColor = color !== 'bg-white' ? 'text-white' : 'text-black';

  return (
    <header className={`${color} flex justify-between items-center h-16 relative`}>
      <img className='w-auto h-full object-contain' src="../../assets/icon1.png" alt="icon for page" />
      <div className={`${textColor} text-lg text-center md:text-xl font-semibold tracking-wide`}>
        {`Welcome, ${userName}!`}
      </div>
      <div
        className="flex items-center justify-center w-12 h-8 mr-4 border-2 border-gray-400 rounded-lg hover:bg-slate-300 m-2 cursor-pointer"
        onClick={toggleAside}
      >
        <LuMenu className="w-12 h-6 text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
