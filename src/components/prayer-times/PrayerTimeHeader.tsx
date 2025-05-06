import type React from "react"

interface PrayerTimeHeaderProps {
  title: string
}

const PrayerTimeHeader: React.FC<PrayerTimeHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 px-4 mb-2">
      <div className="w-1/2"></div>
      <div className="w-1/4 text-right pr-4 text-sm font-medium text-gray-600">Begins</div>
      <div className="w-1/4 text-right pr-4 text-sm font-medium text-gray-600">Jama'ah</div>
    </div>
  )
}

export default PrayerTimeHeader
