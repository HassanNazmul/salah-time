"use client"

import { useState, useMemo } from "react"
import salahData from "../../data/SalahTime.json"
import { Moon, Sun, Sunrise, Sunset, CloudSun } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

export interface PrayerTime {
  name: string
  begins: number | undefined
  jamaah: number | null | undefined
  icon: JSX.Element
  mithl1?: number | undefined
  mithl2?: number | undefined
  isAsr?: boolean
}

export const usePrayerTimes = () => {
  const [currentDate] = useState(new Date())

  // Get current day's prayer times
  const todayPrayers = salahData.find(
    (day) =>
      day.Date === currentDate.getDate() && day.Month === currentDate.toLocaleString("default", { month: "long" }),
  )

  const prayerTimes: PrayerTime[] = [
    {
      name: "Fajr",
      begins: todayPrayers?.Fajr?.Begins,
      jamaah: todayPrayers?.Fajr?.["Jama'ah"],
      icon: <Moon className="w-6 h-6" />,
    },
    {
      name: "Sunrise",
      begins: todayPrayers?.Sunrise,
      jamaah: null,
      icon: <Sunrise className="w-6 h-6" />,
    },
    {
      name: "Zuhr",
      begins: todayPrayers?.Zuhr?.Begins,
      jamaah: todayPrayers?.Zuhr?.["Jama'ah"],
      icon: <Sun className="w-6 h-6" />,
    },
    {
      name: "Asr",
      begins: todayPrayers?.Asr?.Begins,
      jamaah: todayPrayers?.Asr?.["Jama'ah"],
      icon: <CloudSun className="w-6 h-6" />,
      mithl1: todayPrayers?.Asr?.["1 Mithl"] || undefined,
      mithl2: todayPrayers?.Asr?.["2 Mithl"] || undefined,
      isAsr: true,
    },
    {
      name: "Maghrib",
      begins: todayPrayers?.Maghrib?.Begins,
      jamaah: todayPrayers?.Maghrib?.["Jama'ah"],
      icon: <Sunset className="w-6 h-6" />,
    },
    {
      name: "Isha",
      begins: todayPrayers?.Isha?.Begins,
      jamaah: todayPrayers?.Isha?.["Jama'ah"],
      icon: <Moon className="w-6 h-6" />,
    },
  ]

  const prayerBegins = useMemo(() => {
    return prayerTimes.map((prayer) => prayer.begins)
  }, [prayerTimes])

  // Calculate the next prayer
  const nextPrayer = useMemo(() => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeDecimal = currentHour + currentMinute / 100

    // Find the next prayer that hasn't occurred yet
    return prayerTimes.find((prayer) => prayer.begins !== undefined && prayer.begins > currentTimeDecimal)
  }, [prayerBegins])

  return { prayerTimes, nextPrayer }
}

export const formatTime = (time: number | undefined) => {
  if (!time) return "N/A"

  // Convert decimal time to hours and minutes
  const hours = Math.floor(time)
  // Convert decimal part to minutes (e.g., 0.21 means 21 minutes)
  const minutes = Math.round((time % 1) * 100)

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}
