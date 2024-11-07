import React, { useState } from 'react';
import PopUpCardCreateSite from './PopUpCardCreateSite';

interface PopupProps {
  onClose: () => void;
  position?: { x: number; y: number }; // המיקום כאן הוא אופציונלי
  loadSite: boolean;
  setLoadSite: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSitePopup: React.FC<PopupProps> = ({ onClose, position, setLoadSite, loadSite }) => {
  const [showCartPopup, setShowCartPopup] = useState(false);

  const popupStyle = position
    ? { top: position.y, left: position.x }
    : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }; // אם לא נמסר מיקום, הוא יהיה ממורכז

  return (
    <div
      style={popupStyle}
      className="absolute bg-white border rounded shadow-lg p-4 w-full max-w-xs sm:max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create New Site</h2>
      <p className="text-gray-700 mb-6 text-center">Would you like to create a new site?</p>
      <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
        <button
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowCartPopup(true)}
        >
          Create Site
        </button>
        <button
          className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {showCartPopup && (
        <PopUpCardCreateSite
          onClose={() => setShowCartPopup(false)}
          loadSite={loadSite}
          setLoadSite={setLoadSite}
          x={position?.x}
          y={position?.y}
        />
      )}
    </div>
  );
};

export default CreateSitePopup;
