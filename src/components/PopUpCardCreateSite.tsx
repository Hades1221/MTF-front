import React, { useEffect, useRef, useState } from 'react';
import { createSite } from '../server/app';

interface PopUpCardCreateSiteProps {
  onClose: () => void;
  loadSite: boolean;
  setLoadSite: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
}

const PopUpCardCreateSite: React.FC<PopUpCardCreateSiteProps> = ({ onClose, setLoadSite, loadSite, x, y }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitudeCoordinate, setLatitudeCoordinate] = useState<number>(x);
  const [longitudeCoordinate, setLongitudeCoordinate] = useState<number>(y);

  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closePopUp = (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', closePopUp);
    return () => {
      document.removeEventListener('mousedown', closePopUp);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !latitudeCoordinate || !longitudeCoordinate) return;

    const siteData = {
      name,
      address,
      coordinates: [longitudeCoordinate, latitudeCoordinate],
      creationDate: new Date(),
      lastUpdated: null,
    };

    try {
      await createSite(siteData);
      setLoadSite(!loadSite);
      onClose();
    } catch (error) {
      console.error('Error creating site:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 p-4 z-50">
      <div
        ref={popUpRef}
        className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full max-w-md transition-transform transform scale-95 sm:scale-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Create New Site</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude Coordinate:</label>
            <input
              id="latitude"
              type="number"
              value={latitudeCoordinate}
              onChange={(event) => setLatitudeCoordinate(Number(event.target.value) || 0)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude Coordinate:</label>
            <input
              id="longitude"
              type="number"
              value={longitudeCoordinate}
              onChange={(event) => setLongitudeCoordinate(Number(event.target.value) || 0)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpCardCreateSite;
  