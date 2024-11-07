import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); // נווט חזרה לדף הבית או כל דף אחר שתרצה
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
                <button
                    onClick={handleGoBack}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
