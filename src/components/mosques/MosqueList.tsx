import type React from "react"
import MosqueCard from "./MosqueCard"
import type { Mosque } from "@/types/mosque"

interface MosqueListProps {
  mosques: Mosque[]
}

const MosqueList: React.FC<MosqueListProps> = ({ mosques }) => {
  return (
    <div className="space-y-3">
      {mosques.map((mosque) => (
        <MosqueCard
          key={mosque.id}
          mosqueName={mosque.name}
          address={mosque.address}
          facilities={mosque.facilities}
          distance={mosque.distance}
        />
      ))}
    </div>
  )
}

export default MosqueList
