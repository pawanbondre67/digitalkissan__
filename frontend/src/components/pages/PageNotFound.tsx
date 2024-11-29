import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-6xl font-extrabold text-gray-600 mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Page Not Found</h2>
      <p className="px-6 text-lg text-gray-700 mb-8  text-center">
      Sorry, the page you are looking for is currently in progress 🚧.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring focus:ring-gray-300 transition-transform transform hover:scale-105"
      >
        Go to Home 🏠
      </button>
    </div>
  );
};

export default PageNotFound;