"use client"
import PrayerTimeCard from "./PrayerTimeCard"
import PrayerTimeHeader from "./PrayerTimeHeader"
import { usePrayerTimes, formatTime } from "./usePrayerTimes"
import CurrentMosqueCard from "../mosques/CurrentMosqueCard"
import mosqueData from "../../data/MosqueData.json"

const PrayerTimeTable = () => {
  const { prayerTimes, nextPrayer } = usePrayerTimes()

  // For now, we'll use the first mosque as the current mosque
  const currentMosque = mosqueData[0]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prayer Times</h2>

      {/* Current Mosque Card */}
      <CurrentMosqueCard
        mosque={currentMosque}
        nextPrayer={
          nextPrayer
            ? {
                name: nextPrayer.name,
                time: nextPrayer.begins || 0,
              }
            : undefined
        }
      />

      <div className="space-y-3">
        <PrayerTimeHeader title="Prayer Times" />
        {prayerTimes.map((prayer) => (
          <PrayerTimeCard
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
  )
}

export default PrayerTimeTable
