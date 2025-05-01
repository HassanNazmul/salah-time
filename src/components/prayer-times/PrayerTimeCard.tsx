import type React from "react"

interface PrayerTimeCardProps {
  salahName: React.ReactNode
  timeBegins: React.ReactNode
  timeJamaah: React.ReactNode
  mithl1?: React.ReactNode
  mithl2?: React.ReactNode
  isAsr?: boolean
}

const PrayerTimeCard: React.FC<PrayerTimeCardProps> = ({
  salahName,
  timeBegins,
  timeJamaah,
  mithl1,
  mithl2,
  isAsr = false,
}) => {
  if (isAsr && mithl1 && mithl2) {
    return (
      <div className="w-full p-4 border border-gray-200 rounded-md bg-white">
        <div className="flex items-center gap-4">
          <div className="w-1/4 flex items-center">{salahName}</div>
          <div className="w-1/4 flex items-center justify-end gap-2">
            <span className="text-xs text-gray-500">1 MITHL</span>
            <span className="text-gray-900 min-w-[45px] text-right">{mithl1}</span>
          </div>
          <div className="w-1/4 text-right pr-4 text-gray-900">{mithl2}</div>
          <div className="w-1/4 text-right pr-4 text-gray-900">{timeJamaah}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex items-center gap-4">
        <div className="w-1/4 flex items-center">{salahName}</div>
        <div className="w-1/4 flex items-center"></div>
        <div className="w-1/4 text-right pr-4 text-gray-900">{timeBegins}</div>
        <div className="w-1/4 text-right pr-4 text-gray-900">{timeJamaah}</div>
      </div>
    </div>
  )
}

export default PrayerTimeCard
