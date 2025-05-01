"use client"

import type React from "react"
import MosqueCard from "./MosqueCard"
import type { Mosque } from "@/types/mosque"
import { ChevronDown } from "lucide-react"

interface MosqueListProps {
  mosques: Mosque[]
}

const MosqueList: React.FC<MosqueListProps> = ({ mosques }) => {
  return (
    <div className="relative">
      <div className="h-[600px] overflow-y-auto space-y-3 hide-scrollbar w-full">
        {mosques.map((mosque) => (
          <MosqueCard
            key={mosque.id}
            mosqueName={mosque.name}
            address={mosque.address}
            facilities={mosque.facilities}
            distance={mosque.distance}
          />
        ))}

        {mosques.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">No mosques found. Try adjusting your search.</p>
          </div>
        )}
      </div>

      {mosques.length > 5 && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none flex justify-center items-end pb-1 w-full">
          <ChevronDown className="h-5 w-5 text-gray-400 animate-bounce" />
        </div>
      )}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  )
}

export default MosqueList
