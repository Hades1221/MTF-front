import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Side from '../components/Side';

const AboutUs: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const handleLogOut = () => {
    navigate("/login");
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
    <div className={`flex flex-col min-h-screen transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} color="bg-gray-700" />

      <main className="flex-grow bg-gray-100 p-4 container mx-auto max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Team Contributions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Israel Edri</h3>
              <p className="text-gray-700">Backend development focused on optimizing performance and adding new map functionalities to enhance the user experience.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Shmuel Barda</h3>
              <p className="text-gray-700">Established a stable server-side infrastructure, developed various backend functionalities, and integrated external connections with Google services.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Yehuda Vaghel</h3>
              <p className="text-gray-700">Designed and developed the client-side infrastructure, focusing on implementing JWT security measures on both client and server sides, along with Google Maps integration.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Israel Pinto</h3>
              <p className="text-gray-700">Managed and designed databases in MongoDB, including data export to Excel, and implemented secure OTP login options to improve user security and convenience.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Yosef Pinchasov</h3>
              <p className="text-gray-700">Developed an intuitive client-side user interface and user experience, including input validation and integration with Google Maps API.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">Gad Tzarfati</h3>
              <p className="text-gray-700">Managed OTP solutions on the server side, developed user interfaces for authentication processes, and enabled data export to Excel.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Side isOpen={isAsideOpen} showLogoutModal={() => setShowModal(true)} />

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to Logout?
            </p>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                onClick={handleLogOut}
              >
                Confirm Logout
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
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

export default AboutUs;
