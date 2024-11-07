import React, { useState, Dispatch, SetStateAction } from "react";
import { updateSite } from '../server/app';

interface EditSitePopUpProps {
  site: {
    _id: string;
    name: string;
    address: string;
    coordinates: [number, number];
  };
  onClose: () => void;
  setLoadSite: Dispatch<SetStateAction<boolean>>;
  loadSite: boolean;
}

const EditSitePopUp: React.FC<EditSitePopUpProps> = ({ site, onClose, setLoadSite, loadSite }) => {
  const [name, setName] = useState(site.name);
  const [address, setAddress] = useState(site.address);
  const [latitude, setLatitude] = useState<any>(site.coordinates[1]);
  const [longitude, setLongitude] = useState<any>(site.coordinates[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSiteData = {
      name,
      address,
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      lastUpdated: new Date(),
    };

    try {
      await updateSite(site._id, updatedSiteData);
      onClose();
    } catch (error) {
      console.error("Error updating site:", error);
    } finally {
      setLoadSite(!loadSite);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Site</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude:</label>
            <input
              id="latitude"
              type="text"
              value={latitude}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLatitude(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude:</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLongitude(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
            <button
              type="button"
              className="w-full sm:w-1/2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSitePopUp;
