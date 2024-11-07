import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/usersSlice'
import { AppDispatch } from '../redux/store';


const DeleteUser: React.FC<{ email: string }> = ({ email }) => {

  const [showModal, setShowModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      console.log('Deleting user with email:', email);
      await dispatch(deleteUser(email));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  return (
    <div>
      <button
        className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
        onClick={() => setShowModal(true)}
      >
        <MdDelete />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteUser}
              >
                Confirm Delete
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
};

export default DeleteUser;