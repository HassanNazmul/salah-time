import type React from "react"
import { Clock } from "lucide-react"
import type { Mosque } from "@/types/mosque"
import { formatTime } from "../prayer-times/usePrayerTimes"

interface CurrentMosqueCardProps {
  mosque: Mosque
  nextPrayer?: {
    name: string
    time: number
  }
}

const CurrentMosqueCard: React.FC<CurrentMosqueCardProps> = ({ mosque, nextPrayer }) => {
  const formattedAddress = `${mosque.address.street}, ${mosque.address.city}, ${mosque.address.postcode}`

  return (
    <div className="w-full p-4 border border-emerald-200 rounded-md bg-white mb-4 relative flex-1">
      <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
        Current Mosque
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-gray-900 leading-tight">{mosque.name}</h3>
            <p className="text-xs text-gray-500">{formattedAddress}</p>
          </div>

          {nextPrayer && (
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">
                {nextPrayer.name}: {formatTime(nextPrayer.time)}
              </span>
            </div>
          )}
        </div>

        {mosque.facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {mosque.facilities.slice(0, 3).map((facility, index) => (
              <span key={index} className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-50 rounded-full">
                {facility}
              </span>
            ))}
            {mosque.facilities.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-50 rounded-full">
                +{mosque.facilities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentMosqueCard
