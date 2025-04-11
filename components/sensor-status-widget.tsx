"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Battery, Cpu, Droplets, Power } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type SensorStatus = "online" | "offline" | "warning"
type MotorStatus = "on" | "off" | "error"

interface SensorData {
  id: string
  name: string
  type: "moisture" | "temperature" | "light"
  value: number
  unit: string
  status: SensorStatus
  battery: number
}

interface MotorData {
  id: string
  name: string
  status: MotorStatus
  lastRun: string
}

export function SensorStatusWidget() {
  const [sensors, setSensors] = useState<SensorData[]>([])
  const [motors, setMotors] = useState<MotorData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const mockSensors: SensorData[] = [
      {
        id: "SM001",
        name: "Soil Moisture 1",
        type: "moisture",
        value: 42,
        unit: "%",
        status: "online",
        battery: 85,
      },
      {
        id: "SM002",
        name: "Soil Moisture 2",
        type: "moisture",
        value: 28,
        unit: "%",
        status: "warning",
        battery: 65,
      },
      {
        id: "TM001",
        name: "Temperature 1",
        type: "temperature",
        value: 28.5,
        unit: "°C",
        status: "online",
        battery: 90,
      },
    ]

    const mockMotors: MotorData[] = [
      {
        id: "WP001",
        name: "Water Pump 1",
        status: "on",
        lastRun: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
      },
      {
        id: "WP002",
        name: "Water Pump 2",
        status: "off",
        lastRun: new Date(Date.now() - 6 * 3600000).toISOString(), // 6 hours ago
      },
    ]

    setSensors(mockSensors)
    setMotors(mockMotors)
    setLoading(false)
  }, [])

  const getMoistureStatus = (value: number) => {
    if (value < 30) return { status: "Low", color: "text-red-500" }
    if (value < 60) return { status: "Optimal", color: "text-green-500" }
    return { status: "High", color: "text-blue-500" }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)

    if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
    } else {
      return "Just now"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sensors & Motors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <p>Loading sensor data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="mr-2 h-5 w-5" />
          Sensors & Motors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Sensor Status</h3>
            <div className="space-y-3">
              {sensors.slice(0, 2).map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium flex items-center">
                      <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                      {sensor.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sensor.value} {sensor.unit}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge
                      className={`${
                        sensor.status === "online"
                          ? "bg-green-100 text-green-800"
                          : sensor.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sensor.status}
                    </Badge>
                    <div className="flex items-center mt-1 text-xs">
                      <Battery className="h-3 w-3 mr-1" />
                      <span
                        className={`${
                          sensor.battery < 20
                            ? "text-red-500"
                            : sensor.battery < 50
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {sensor.battery}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Motor Status</h3>
            <div className="space-y-3">
              {motors.map((motor) => (
                <div key={motor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{motor.name}</div>
                    <div className="text-sm text-gray-500">Last run: {formatTimeAgo(motor.lastRun)}</div>
                  </div>
                  <div className="flex items-center">
                    <Power className={`h-5 w-5 mr-2 ${motor.status === "on" ? "text-green-500" : "text-gray-400"}`} />
                    <Badge
                      className={`${
                        motor.status === "on"
                          ? "bg-green-100 text-green-800"
                          : motor.status === "error"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {motor.status === "on" ? "Running" : motor.status === "off" ? "Off" : "Error"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/sensors" className="w-full">
          <Button variant="outline" className="w-full justify-between">
            <span>View All Sensors & Motors</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
