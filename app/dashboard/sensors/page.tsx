"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Battery, Droplets, Power, RefreshCw, Sun, Thermometer, Timer, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

type SensorType = "moisture" | "light" | "temperature" | "flow"
type SensorStatus = "online" | "offline" | "warning" | "critical"
type MotorStatus = "on" | "off" | "error" | "maintenance"

interface Sensor {
  id: string
  name: string
  location: string
  type: SensorType
  value: number
  unit: string
  status: SensorStatus
  battery: number
  lastUpdated: string
}

interface Motor {
  id: string
  name: string
  location: string
  status: MotorStatus
  lastRun: string
  runDuration: number
  scheduledRun: string | null
  powerConsumption: number
}

export default function SensorsPage() {
  const { toast } = useToast()
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [motors, setMotors] = useState<Motor[]>([])

  // Mock data initialization
  useEffect(() => {
    // Mock sensors data
    const mockSensors: Sensor[] = [
      {
        id: "SM001",
        name: "Soil Moisture Sensor 1",
        location: "North Field",
        type: "moisture",
        value: 42,
        unit: "%",
        status: "online",
        battery: 85,
        lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
      },
      {
        id: "SM002",
        name: "Soil Moisture Sensor 2",
        location: "East Field",
        type: "moisture",
        value: 28,
        unit: "%",
        status: "warning",
        battery: 65,
        lastUpdated: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      },
      {
        id: "SM003",
        name: "Soil Moisture Sensor 3",
        location: "South Field",
        type: "moisture",
        value: 55,
        unit: "%",
        status: "online",
        battery: 92,
        lastUpdated: new Date(Date.now() - 2 * 60000).toISOString(), // 2 minutes ago
      },
      {
        id: "LS001",
        name: "Light Sensor 1",
        location: "North Field",
        type: "light",
        value: 75000,
        unit: "lux",
        status: "online",
        battery: 78,
        lastUpdated: new Date(Date.now() - 8 * 60000).toISOString(), // 8 minutes ago
      },
      {
        id: "LS002",
        name: "Light Sensor 2",
        location: "East Field",
        type: "light",
        value: 68000,
        unit: "lux",
        status: "offline",
        battery: 12,
        lastUpdated: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
      },
      {
        id: "TS001",
        name: "Temperature Sensor 1",
        location: "North Field",
        type: "temperature",
        value: 28.5,
        unit: "°C",
        status: "online",
        battery: 90,
        lastUpdated: new Date(Date.now() - 3 * 60000).toISOString(), // 3 minutes ago
      },
      {
        id: "TS002",
        name: "Temperature Sensor 2",
        location: "South Field",
        type: "temperature",
        value: 30.2,
        unit: "°C",
        status: "online",
        battery: 72,
        lastUpdated: new Date(Date.now() - 7 * 60000).toISOString(), // 7 minutes ago
      },
      {
        id: "WF001",
        name: "Water Flow Sensor 1",
        location: "North Field",
        type: "flow",
        value: 12.5,
        unit: "L/min",
        status: "online",
        battery: 88,
        lastUpdated: new Date(Date.now() - 1 * 60000).toISOString(), // 1 minute ago
      },
      {
        id: "WF002",
        name: "Water Flow Sensor 2",
        location: "East Field",
        type: "flow",
        value: 0,
        unit: "L/min",
        status: "warning",
        battery: 45,
        lastUpdated: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
      },
    ]

    // Mock motors data
    const mockMotors: Motor[] = [
      {
        id: "WP001",
        name: "Water Pump 1",
        location: "North Field",
        status: "on",
        lastRun: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
        runDuration: 45, // minutes
        scheduledRun: null,
        powerConsumption: 1.2, // kW
      },
      {
        id: "WP002",
        name: "Water Pump 2",
        location: "East Field",
        status: "off",
        lastRun: new Date(Date.now() - 6 * 3600000).toISOString(), // 6 hours ago
        runDuration: 30, // minutes
        scheduledRun: new Date(Date.now() + 2 * 3600000).toISOString(), // 2 hours from now
        powerConsumption: 0.8, // kW
      },
      {
        id: "IM001",
        name: "Irrigation Motor 1",
        location: "South Field",
        status: "off",
        lastRun: new Date(Date.now() - 12 * 3600000).toISOString(), // 12 hours ago
        runDuration: 60, // minutes
        scheduledRun: new Date(Date.now() + 8 * 3600000).toISOString(), // 8 hours from now
        powerConsumption: 1.5, // kW
      },
      {
        id: "IM002",
        name: "Irrigation Motor 2",
        location: "North Field",
        status: "maintenance",
        lastRun: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
        runDuration: 0, // minutes
        scheduledRun: null,
        powerConsumption: 0, // kW
      },
      {
        id: "IM003",
        name: "Irrigation Motor 3",
        location: "East Field",
        status: "error",
        lastRun: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
        runDuration: 15, // minutes (stopped due to error)
        scheduledRun: null,
        powerConsumption: 0, // kW
      },
    ]

    setSensors(mockSensors)
    setMotors(mockMotors)
  }, [])

  const refreshData = () => {
    setRefreshing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Update sensor values with slight variations
      const updatedSensors = sensors.map((sensor) => {
        let newValue = sensor.value

        // Add some random variation to sensor values
        if (sensor.type === "moisture") {
          newValue = Math.max(0, Math.min(100, sensor.value + (Math.random() * 10 - 5)))
        } else if (sensor.type === "light") {
          newValue = Math.max(0, Math.min(100000, sensor.value + (Math.random() * 5000 - 2500)))
        } else if (sensor.type === "temperature") {
          newValue = Math.max(15, Math.min(40, sensor.value + (Math.random() * 2 - 1)))
        } else if (sensor.type === "flow") {
          newValue = Math.max(0, Math.min(20, sensor.value + (Math.random() * 3 - 1.5)))
        }

        return {
          ...sensor,
          value: Number(newValue.toFixed(sensor.type === "temperature" ? 1 : 0)),
          lastUpdated: new Date().toISOString(),
        }
      })

      setSensors(updatedSensors)
      setLastRefreshed(new Date())
      setRefreshing(false)

      toast({
        title: "Data Refreshed",
        description: "Sensor and motor data has been updated.",
      })
    }, 1500)
  }

  const toggleMotor = (motorId: string) => {
    setMotors((prevMotors) =>
      prevMotors.map((motor) => {
        if (motor.id === motorId && (motor.status === "on" || motor.status === "off")) {
          const newStatus = motor.status === "on" ? "off" : "on"

          toast({
            title: `Motor ${newStatus === "on" ? "Started" : "Stopped"}`,
            description: `${motor.name} has been ${newStatus === "on" ? "turned on" : "turned off"}.`,
          })

          return {
            ...motor,
            status: newStatus as MotorStatus,
            lastRun: newStatus === "on" ? new Date().toISOString() : motor.lastRun,
          }
        }
        return motor
      }),
    )
  }

  const filteredSensors =
    selectedLocation === "all" ? sensors : sensors.filter((sensor) => sensor.location === selectedLocation)

  const filteredMotors =
    selectedLocation === "all" ? motors : motors.filter((motor) => motor.location === selectedLocation)

  const getSensorStatusColor = (status: SensorStatus) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMotorStatusColor = (status: MotorStatus) => {
    switch (status) {
      case "on":
        return "bg-green-100 text-green-800"
      case "off":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSensorIcon = (type: SensorType, size = 5) => {
    switch (type) {
      case "moisture":
        return <Droplets className={`h-${size} w-${size} text-blue-500`} />
      case "light":
        return <Sun className={`h-${size} w-${size} text-yellow-500`} />
      case "temperature":
        return <Thermometer className={`h-${size} w-${size} text-red-500`} />
      case "flow":
        return <Droplets className={`h-${size} w-${size} text-cyan-500`} />
      default:
        return <Droplets className={`h-${size} w-${size} text-blue-500`} />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
    } else {
      return "Just now"
    }
  }

  const getMoistureStatus = (value: number) => {
    if (value < 30) return { status: "Low", color: "text-red-500" }
    if (value < 60) return { status: "Optimal", color: "text-green-500" }
    return { status: "High", color: "text-blue-500" }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6 overflow-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Sensors & Motors</h1>
              <p className="text-sm text-gray-500">
                Last updated: {lastRefreshed.toLocaleTimeString()} ({formatTimeAgo(lastRefreshed.toISOString())})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="North Field">North Field</SelectItem>
                <SelectItem value="East Field">East Field</SelectItem>
                <SelectItem value="South Field">South Field</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={refreshData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sensors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSensors.length}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {filteredSensors.filter((s) => s.status === "online").length} Online
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  {filteredSensors.filter((s) => s.status === "warning").length} Warning
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                  {filteredSensors.filter((s) => s.status === "offline").length} Offline
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Motors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredMotors.length}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {filteredMotors.filter((m) => m.status === "on").length} Running
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                  {filteredMotors.filter((m) => m.status === "off").length} Idle
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  {filteredMotors.filter((m) => m.status === "error" || m.status === "maintenance").length} Issues
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Soil Moisture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  filteredSensors.filter((s) => s.type === "moisture").reduce((sum, s) => sum + s.value, 0) /
                    (filteredSensors.filter((s) => s.type === "moisture").length || 1),
                )}
                %
              </div>
              <Progress
                value={Math.round(
                  filteredSensors.filter((s) => s.type === "moisture").reduce((sum, s) => sum + s.value, 0) /
                    (filteredSensors.filter((s) => s.type === "moisture").length || 1),
                )}
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sensors">
          <TabsList className="mb-6">
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="motors">Motors</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="sensors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSensors.map((sensor) => (
                <Card key={sensor.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getSensorIcon(sensor.type)}
                          {sensor.name}
                        </CardTitle>
                        <CardDescription>{sensor.location}</CardDescription>
                      </div>
                      <Badge className={getSensorStatusColor(sensor.status)}>
                        {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Current Value:</span>
                        <span className="text-2xl font-bold">
                          {sensor.value} {sensor.unit}
                        </span>
                      </div>

                      {sensor.type === "moisture" && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Moisture Level</span>
                            <span className={getMoistureStatus(sensor.value).color}>
                              {getMoistureStatus(sensor.value).status}
                            </span>
                          </div>
                          <Progress value={sensor.value} className="h-2" />
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Battery className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-500">Battery:</span>
                        </div>
                        <span
                          className={`font-medium ${
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

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-500">Last Updated:</span>
                        </div>
                        <span className="font-medium">{formatTimeAgo(sensor.lastUpdated)}</span>
                      </div>

                      {sensor.status === "offline" && (
                        <div className="bg-gray-100 p-3 rounded-md flex items-center gap-2 text-sm">
                          <WifiOff className="h-4 w-4 text-gray-500" />
                          <span>Sensor is offline. Check connection or battery.</span>
                        </div>
                      )}

                      {sensor.status === "warning" && (
                        <div className="bg-yellow-50 p-3 rounded-md flex items-center gap-2 text-sm text-yellow-800">
                          <span>⚠️</span>
                          <span>Sensor reading is outside normal range.</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="motors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMotors.map((motor) => (
                <Card key={motor.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{motor.name}</CardTitle>
                        <CardDescription>{motor.location}</CardDescription>
                      </div>
                      <Badge className={getMotorStatusColor(motor.status)}>
                        {motor.status.charAt(0).toUpperCase() + motor.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Power:</span>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={motor.status === "on"}
                          onCheckedChange={() => toggleMotor(motor.id)}
                          disabled={motor.status === "error" || motor.status === "maintenance"}
                        />
                        <Power className={`h-5 w-5 ${motor.status === "on" ? "text-green-500" : "text-gray-400"}`} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Last Run:</span>
                      <span className="font-medium">{formatTimeAgo(motor.lastRun)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Run Duration:</span>
                      <span className="font-medium">{motor.runDuration} minutes</span>
                    </div>

                    {motor.status === "on" && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Power Consumption:</span>
                        <span className="font-medium">{motor.powerConsumption} kW</span>
                      </div>
                    )}

                    {motor.scheduledRun && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Next Scheduled Run:</span>
                        <span className="font-medium">
                          {new Date(motor.scheduledRun).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    )}

                    {motor.status === "error" && (
                      <div className="bg-red-50 p-3 rounded-md flex items-center gap-2 text-sm text-red-800">
                        <span>⚠️</span>
                        <span>Motor error detected. Maintenance required.</span>
                      </div>
                    )}

                    {motor.status === "maintenance" && (
                      <div className="bg-blue-50 p-3 rounded-md flex items-center gap-2 text-sm text-blue-800">
                        <span>🔧</span>
                        <span>Motor is under scheduled maintenance.</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Moisture Overview</CardTitle>
                  <CardDescription>Current moisture levels across all fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["North Field", "East Field", "South Field"].map((location) => {
                      const locationSensors = sensors.filter((s) => s.location === location && s.type === "moisture")
                      const avgMoisture = locationSensors.length
                        ? Math.round(locationSensors.reduce((sum, s) => sum + s.value, 0) / locationSensors.length)
                        : 0

                      return (
                        <div key={location}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{location}</span>
                            <span className={getMoistureStatus(avgMoisture).color}>
                              {avgMoisture}% - {getMoistureStatus(avgMoisture).status}
                            </span>
                          </div>
                          <Progress value={avgMoisture} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Motor Status</CardTitle>
                  <CardDescription>Current status of all irrigation motors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {motors.map((motor) => (
                      <div key={motor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{motor.name}</div>
                          <div className="text-sm text-gray-500">{motor.location}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getMotorStatusColor(motor.status)}>
                            {motor.status.charAt(0).toUpperCase() + motor.status.slice(1)}
                          </Badge>
                          {(motor.status === "on" || motor.status === "off") && (
                            <Button
                              size="sm"
                              variant={motor.status === "on" ? "destructive" : "default"}
                              className={motor.status === "on" ? "" : "bg-green-600 hover:bg-green-700"}
                              onClick={() => toggleMotor(motor.id)}
                            >
                              {motor.status === "on" ? "Stop" : "Start"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sensor Health Overview</CardTitle>
                  <CardDescription>Battery levels and connectivity status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sensors.map((sensor) => (
                      <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getSensorIcon(sensor.type, 4)}
                          <div>
                            <div className="font-medium">{sensor.name}</div>
                            <div className="text-xs text-gray-500">{sensor.location}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge className={getSensorStatusColor(sensor.status)}>
                            {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
                          </Badge>
                          <div
                            className={`text-xs mt-1 ${
                              sensor.battery < 20
                                ? "text-red-500"
                                : sensor.battery < 50
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }`}
                          >
                            Battery: {sensor.battery}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
