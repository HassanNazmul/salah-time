"use client";

import React, { useState } from 'react';
import mosqueData from '@/data/MosqueData.json';
import MosqueCard from './cards/MosqueCards';
import MosqueSearch from './mosque/search/MosqueSearch';

const MosqueTable = () => {
  const [filteredMosques, setFilteredMosques] = useState(mosqueData);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Local Mosques</h2>
      <MosqueSearch onSearchResults={setFilteredMosques} />
      <div className="space-y-3">
        {filteredMosques.map((mosque) => (
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