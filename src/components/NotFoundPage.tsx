import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl mb-8">Page Not Found</h2>
            <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleGoBack}
            >
                Go Back
            </button>
        </div>
    );
};

export default NotFoundPage;
