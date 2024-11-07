// Logout component
import React from 'react';
import { TbLogout } from 'react-icons/tb';

interface LogoutProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const Logout: React.FC<LogoutProps> = ({ showModal, setShowModal }) => {
  return (
    <div>
      <button 
        className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
        onClick={() => {setShowModal(true); console.log('meh')}} 
      >
        <TbLogout />
      </button>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to Logout? 
            </p>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded" 
              >
                Confirm Logout
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;