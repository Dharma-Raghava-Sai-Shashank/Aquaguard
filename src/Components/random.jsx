import React from 'react';

const LandingPage = () => {
  // window.location.reload();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-yellow-300">AquaGuard</span>
        </h1>

        <p className="text-lg font-medium mb-8">
          Revolutionizing water management with IoT-based insights and analytics.
        </p>

        <div className="space-x-4">
          <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-200">
            Learn More
          </button>
        </div>

        <div className="mt-12">
          <img
            src="https://via.placeholder.com/600x400"
            alt="IoT Water Management"
            className="w-full max-w-3xl rounded-lg shadow-lg"
          />
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AquaGuard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
