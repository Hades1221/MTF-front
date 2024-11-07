import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

interface DeleteSiteProps {
  siteId: string;
  onDelete: () => void;
  setLoadSite: Dispatch<SetStateAction<boolean>>;
  loadSite: boolean;
}

const DeleteSite: React.FC<DeleteSiteProps> = ({ siteId, onDelete, setLoadSite, loadSite }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteSite = async () => {
    setLoading(true);
    try {
      // השתמש רק ב-URL המרוחק
      const response = await axios.delete(`https://mtf-server-l03g.onrender.com/api/site/deleteSite/${siteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Delete response:', response.data);

      setShowModal(false);
      onDelete();
    } catch (err) {
      setError('Failed to delete the site');
      console.error('Error deleting site:', err);
    } finally {
      setLoading(false);
      setLoadSite(!loadSite);
    }
  };

  return (
    <div>
      <button 
        className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
        onClick={() => setShowModal(true)}
      >
        <MdDelete />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6 text-center">
              Are you sure you want to delete this site? This action cannot be undone.
            </p>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                type="button"
                className="w-full sm:w-1/2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                onClick={handleDeleteSite}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button
                type="button"
                className="w-full sm:w-1/2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                onClick={() => setShowModal(false)}
                disabled={loading}
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

export default DeleteSite;
