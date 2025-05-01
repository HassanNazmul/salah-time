"use client"

import { useCallback } from "react"
import mosqueData from "../../../data/MosqueData.json"
import { calculateDistanceFromPostcodes } from "./GeoTraking"
import { filterMosquesByQuery, addDistancesToMosques } from "./Search"

export const useMosqueSearch = () => {
  const getFilteredMosques = useCallback(async (searchQuery: string, userPostcode?: string) => {
    let filteredMosques = filterMosquesByQuery(mosqueData, searchQuery)

    if (userPostcode) {
      filteredMosques = await addDistancesToMosques(filteredMosques, userPostcode, calculateDistanceFromPostcodes)
    }

    return filteredMosques
  }, [])

  return { getFilteredMosques }
}
