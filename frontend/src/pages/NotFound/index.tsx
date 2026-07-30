import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-8xl font-black text-teal-600 mb-4">404</h1>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-teal-600 text-white px-8 py-3 rounded-xl font-extrabold hover:bg-teal-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
