"use client";

import React, { useState, useEffect } from 'react';
import mosqueData from '@/data/MosqueData.json';
import { Search, MapPin } from 'lucide-react';
import { getUserLocation, calculateDistanceFromPostcodes } from '@/components/mosque/search/GeoTraking';
import { filterMosquesByQuery, addDistancesToMosques } from '@/components/mosque/search/Search';

interface MosqueSearchProps {
  onSearchResults: (results: typeof mosqueData) => void;
}

const MosqueSearch: React.FC<MosqueSearchProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ postcode: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLocationClick = async () => {
    setLoading(true);
    try {
      const location = await getUserLocation();
      if (location) {
        setUserLocation(location);
        return;
      }

      const manualPostcode = prompt('Could not detect location automatically. Please enter your postcode:');
      if (!manualPostcode) {
        return;
      }

      const cleanPostcode = manualPostcode.replace(/\s/g, '');
      setUserLocation({ postcode: cleanPostcode });
    } catch (error) {
      console.error('Error detecting location:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateResults = async () => {
      let filteredMosques = filterMosquesByQuery(mosqueData, searchQuery);

      if (userLocation) {
        filteredMosques = await addDistancesToMosques(
          filteredMosques,
          userLocation.postcode,
          calculateDistanceFromPostcodes
        );
      }

      onSearchResults(filteredMosques);
    };

    updateResults();
  }, [searchQuery, userLocation, onSearchResults]);

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <button
            onClick={handleLocationClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Find mosques by postcode"
            disabled={loading}
          >
            <MapPin className={`h-5 w-5 ${loading ? 'text-gray-300' : 'text-gray-400'}`} />
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search mosques by name, address or facilities"
          className="w-full pl-12 pr-10 py-2 border border-gray-200 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400 text-gray-900"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MosqueSearch;