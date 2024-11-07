import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Side from '../components/Side';
import TableSide from '../components/TableSite';
import SearchSite from '../components/SearchSite';
import PopUpCardCreateSite from '../components/PopUpCardCreateSite';
import DownloadSiteList from '../components/DownloadSiteList';

const sites: React.FC = () => {
    const [popUpCreateSite, setPopUpCreateSite] = useState(false);
    const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
    const [loadSite, setLoadSite] = useState(false);
    const [isDownloadSitesPopupVisible, setIsDownloadSitesPopupVisible] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const toggleAside = () => {
        setAsideOpen(!isAsideOpen);
    };

    const handleLogOut = () => {
        navigate("/login");
    };

    const showDownloadPopup = () => {
        setIsDownloadSitesPopupVisible(!isDownloadSitesPopupVisible);
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
            <Header toggleAside={toggleAside} color="bg-white" />

            <main className="flex-grow bg-gray-100 p-4 container mx-auto max-w-full">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:justify-between items-center mb-4">
                    <button
                        onClick={() => setPopUpCreateSite(true)}
                        className="flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 shadow w-full md:w-auto md:max-w-xs"
                    >
                        <img src="../../assets/add location.png" alt="Add Site" className="w-6 h-6 inline-block" />
                        <span className="ml-2 hidden md:inline">Add Site</span>
                    </button>
                    {popUpCreateSite && (
                        <PopUpCardCreateSite
                            onClose={() => setPopUpCreateSite(false)}
                            setLoadSite={setLoadSite}
                            loadSite={loadSite}
                            x={0}  // ניתן לעדכן את הקואורדינטות
                            y={0}  // ניתן לעדכן את הקואורדינטות
                        />
                    )}
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:ml-4 md:flex-wrap">
                        <button
                            onClick={showDownloadPopup}
                            className="flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 shadow w-full md:w-auto md:mr-2"
                        >
                            <img src="../../assets/xl wite.png" alt="Download" className="w-6 h-6 inline-block" />
                            <span className="ml-2 hidden md:inline">Download List</span>
                        </button>
                        <div className="w-full md:w-auto mt-2 md:mt-0">
                            <SearchSite />
                        </div>
                    </div>
                </div>

                {isDownloadSitesPopupVisible && (
                    <DownloadSiteList setIsDownloadPopupVisible={setIsDownloadSitesPopupVisible}/>
                )}

                <div className="container mx-auto bg-white shadow-md rounded-lg p-6 max-w-full">
                    <TableSide loadSite={loadSite} setLoadSite={setLoadSite} />
                </div>
            </main>

            <Footer />
            <Side isOpen={isAsideOpen} showLogoutModal={() => setShowModal(true)} />

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
                                onClick={handleLogOut}
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

export default sites;
