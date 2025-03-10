import React from 'react';
import TimeTable from './TimeTable';
import MosqueTable from './MosqueTable';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Content Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - TimeTable */}
            <div className="w-full">
              <TimeTable />
            </div>
            {/* Right Section - MosqueTable */}
            <div className="w-full">
              <MosqueTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;