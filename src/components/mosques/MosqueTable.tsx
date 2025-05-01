"use client"

import { useState } from "react"
import mosqueData from "../../data/MosqueData.json"
import MosqueSearch from "./search/MosqueSearch"
import MosqueList from "./MosqueList"
import type { Mosque } from "@/types/mosque"

const MosqueTable = () => {
  const [filteredMosques, setFilteredMosques] = useState<Mosque[]>(mosqueData)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Local Mosques</h2>
      <MosqueSearch onSearchResults={setFilteredMosques} />
      <MosqueList mosques={filteredMosques} />
    </div>
  )
}

export default MosqueTable
