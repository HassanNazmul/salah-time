import React from 'react';

interface TimeCardProps {
    salahName: React.ReactNode;
    timeBegins: React.ReactNode;
    timeJamaah: React.ReactNode;
}

const TimeCard: React.FC<TimeCardProps> = ({
  salahName,
  timeBegins,
  timeJamaah,
}) => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex items-center gap-4">
        <div className="w-1/2 flex items-center">{salahName}</div>
        <div className="w-1/4 text-right text-gray-900">{timeBegins}</div>
        <div className="w-1/4 text-right text-gray-900">{timeJamaah}</div>
      </div>
    </div>
  );
};

export default TimeCard;