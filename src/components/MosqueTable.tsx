import React from 'react';
import mosqueData from '@/data/MosqueData.json';
import MosqueCard from './cards/MosqueCards';

const MosqueTable = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Local Mosques</h2>
      <div className="space-y-3">
        {mosqueData.map((mosque) => (
          <MosqueCard
            key={mosque.id}
            mosqueName={mosque.name}
            address={mosque.address}
            facilities={mosque.facilities}
          />
        ))}      
      </div>
    </div>
  );
};

export default MosqueTable;