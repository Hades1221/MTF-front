import React from 'react';
import axios from 'axios';

interface DownloadSiteListProps {
  setIsDownloadPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadSiteList: React.FC<DownloadSiteListProps> = ({ setIsDownloadPopupVisible }) => {
  const handleClose = () => {
    setIsDownloadPopupVisible(false);
  };

  const downloadSites: () => Promise<void> = async () => {
    try {
      // השתמש רק ב-URL המרוחק
      const response = await axios.get('https://mtf-server-l03g.onrender.com/api/site/export-sites', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sites.xlsx'); // Download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after download
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Download Site List</h2>
        <p className="text-gray-600 mb-4 text-center">Are you sure you want to download the site list?</p>
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={handleClose} 
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors w-full sm:w-auto"
          >
            Cancel
          </button>
          <button 
            onClick={downloadSites} 
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition-colors w-full sm:w-auto"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSiteList;
