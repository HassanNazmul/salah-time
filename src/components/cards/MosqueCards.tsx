import React from 'react';

interface MosqueCardProps {
    mosqueName: React.ReactNode;
    address: {
        street: string;
        city: string;
        postcode: string;
        country: string;
    };
    distance?: string;
    facilities?: string[];
}

const MosqueCard: React.FC<MosqueCardProps> = ({
  mosqueName,
  address,
  distance,
  facilities = []
}) => {
  const formattedAddress = `${address.street}, ${address.city}, ${address.postcode}`;

  return (
    <div className="w-full p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">{mosqueName}</h3>
            <p className="text-xs text-gray-500">{formattedAddress}</p>
          </div>
        </div>
        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {facilities.slice(0, 3).map((facility, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-50 rounded-full"
              >
                {facility}
              </span>
            ))}
            {facilities.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-50 rounded-full">
                +{facilities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MosqueCard;