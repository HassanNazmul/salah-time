"use client";

import React, { useState } from 'react';
import TimeCard from './cards/TimeCards';
import salahData from '@/data/SalahTime.json';
import { Moon, Sun, Sunrise, Sunset, CloudSun } from 'lucide-react';

const TimeTable = () => {
  const [currentDate] = useState(new Date());

  // Get current day's prayer times
  const todayPrayers = salahData.find(
    (day) =>
      day.Date === currentDate.getDate() &&
      day.Month === currentDate.toLocaleString('default', { month: 'long' })
  );

  const prayerTimes = [
    { name: 'Fajr', begins: todayPrayers?.Fajr?.Begins, jamaah: todayPrayers?.Fajr?.['Jama\'ah'], icon: <Moon className="w-6 h-6" /> },
    { name: 'Sunrise', begins: todayPrayers?.Sunrise, jamaah: null, icon: <Sunrise className="w-6 h-6" /> },
    { name: 'Zuhr', begins: todayPrayers?.Zuhr?.Begins, jamaah: todayPrayers?.Zuhr?.['Jama\'ah'], icon: <Sun className="w-6 h-6" /> },
    { 
      name: 'Asr', 
      begins: todayPrayers?.Asr?.Begins, 
      jamaah: todayPrayers?.Asr?.['Jama\'ah'], 
      icon: <CloudSun className="w-6 h-6" />,
      mithl1: todayPrayers?.Asr?.['1 Mithl'] || undefined,
      mithl2: todayPrayers?.Asr?.['2 Mithl'] || undefined,
      isAsr: true
    },
    { name: 'Maghrib', begins: todayPrayers?.Maghrib?.Begins, jamaah: todayPrayers?.Maghrib?.['Jama\'ah'], icon: <Sunset className="w-6 h-6" /> },
    { name: 'Isha', begins: todayPrayers?.Isha?.Begins, jamaah: todayPrayers?.Isha?.['Jama\'ah'], icon: <Moon className="w-6 h-6" /> },
  ];

  const formatTime = (time: number | undefined) => {
    if (!time) return 'N/A';
    
    // Convert decimal time to hours and minutes
    const hours = Math.floor(time);
    // Convert decimal part to minutes (e.g., 0.21 means 21 minutes)
    const minutes = Math.round((time % 1) * 100);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prayer Times</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-4 px-4 mb-2">
          <div className="w-1/2"></div>
          <div className="w-1/4 text-right pr-4 text-sm font-medium text-gray-600">Begins</div>
          <div className="w-1/4 text-right pr-4 text-sm font-medium text-gray-600">Jama'ah</div>
        </div>
        {prayerTimes.map((prayer) => (
          <TimeCard
            key={prayer.name}
            salahName={
              <div className="flex items-center gap-2">
                {prayer.icon}
                <span className="font-medium text-gray-900">{prayer.name}</span>
              </div>
            }
            timeBegins={formatTime(prayer.begins)}
            timeJamaah={prayer.jamaah ? formatTime(prayer.jamaah) : undefined}
            mithl1={prayer.mithl1 ? formatTime(prayer.mithl1) : undefined}
            mithl2={prayer.mithl2 ? formatTime(prayer.mithl2) : undefined}
            isAsr={prayer.isAsr}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeTable;