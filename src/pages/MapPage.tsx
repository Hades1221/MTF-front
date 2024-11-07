import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Side from '../components/Side';
import Map from '../components/Map';
import { useNavigate } from 'react-router-dom';
import CreateSitePopup from '../components/CreateSiteOnMap';

const MapPage: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showSiteModal, setShowSiteModal] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [loadSite, setLoadSite] = useState<boolean>(false); // הוספנו את loadSite
  const navigate = useNavigate();

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate("/login");
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setPopupPosition({ x: event.clientX, y: event.clientY });
    setShowSiteModal(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setAsideOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} color="bg-gray-700" />

      <div className="flex flex-1 overflow-hidden">
        <Side isOpen={isAsideOpen} showLogoutModal={() => setShowModal(true)} />

        <main className="flex-grow min-w-[300px]">
          <div onContextMenu={handleRightClick} className="h-full">
            <Map />
          </div>
        </main>
      </div>

      <Footer />

      {/* Popup for creating a new site */}
      {showSiteModal && popupPosition && (
        <CreateSitePopup
          onClose={() => setShowSiteModal(false)}
          position={popupPosition}
          loadSite={loadSite} // שולח את loadSite
          setLoadSite={setLoadSite} // שולח את setLoadSite
        />
      )}

      {/* Logout Modal */}
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
                onClick={() => {
                  handleLogOut();
                  setShowModal(false);
                }}
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
};

export default MapPage;
