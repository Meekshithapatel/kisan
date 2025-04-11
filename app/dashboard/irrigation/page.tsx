"use client"

import { useState } from "react"
import { ArrowLeft, Droplets, Power, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

type IrrigationZone = {
  id: number
  name: string
  status: "active" | "inactive" | "scheduled"
  moisture: number
  schedule: string
  lastIrrigation: string
  autoMode: boolean
}

export default function IrrigationPage() {
  const { toast } = useToast()
  const [zones, setZones] = useState<IrrigationZone[]>([
    {
      id: 1,
      name: "Rice Field - North",
      status: "active",
      moisture: 65,
      schedule: "Daily at 6:00 AM",
      lastIrrigation: "Today at 6:00 AM",
      autoMode: true,
    },
    {
      id: 2,
      name: "Wheat Field - East",
      status: "inactive",
      moisture: 78,
      schedule: "Every 2 days at 5:30 AM",
      lastIrrigation: "Yesterday at 5:30 AM",
      autoMode: true,
    },
    {
      id: 3,
      name: "Vegetable Garden",
      status: "scheduled",
      moisture: 45,
      schedule: "Daily at 5:00 PM",
      lastIrrigation: "Yesterday at 5:00 PM",
      autoMode: false,
    },
  ])

  const toggleIrrigation = (zoneId: number) => {
    setZones(
      zones.map((zone) => {
        if (zone.id === zoneId) {
          const newStatus = zone.status === "active" ? "inactive" : "active"

          toast({
            title: `Irrigation ${newStatus === "active" ? "Started" : "Stopped"}`,
            description: `${zone.name} irrigation has been ${newStatus === "active" ? "started" : "stopped"}.`,
          })

          return {
            ...zone,
            status: newStatus,
          }
        }
        return zone
      }),
    )
  }

  const toggleAutoMode = (zoneId: number) => {
    setZones(
      zones.map((zone) => {
        if (zone.id === zoneId) {
          const newAutoMode = !zone.autoMode

          toast({
            title: `Auto Mode ${newAutoMode ? "Enabled" : "Disabled"}`,
            description: `${zone.name} will ${newAutoMode ? "now be automatically irrigated based on soil moisture and weather" : "need manual irrigation control"}.`,
          })

          return {
            ...zone,
            autoMode: newAutoMode,
          }
        }
        return zone
      }),
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold">Smart Irrigation System</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">Active</div>
                  <div className="text-sm text-gray-500">All systems operational</div>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Power className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Water Usage Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">1,250 L</div>
                  <div className="text-sm text-gray-500">15% less than average</div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">No Rain</div>
                  <div className="text-sm text-gray-500">Next 24 hours</div>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Irrigation Zones</h2>

        <div className="grid grid-cols-1 gap-6">
          {zones.map((zone) => (
            <Card key={zone.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{zone.name}</h3>
                      <div
                        className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                          zone.status === "active"
                            ? "bg-green-100 text-green-800"
                            : zone.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soil Moisture</span>
                        <span>{zone.moisture}%</span>
                      </div>
                      <Progress
                        value={zone.moisture}
                        className="h-2"
                        color={zone.moisture < 40 ? "bg-red-500" : zone.moisture > 70 ? "bg-green-500" : "bg-amber-500"}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Schedule:</span> {zone.schedule}
                      </div>
                      <div>
                        <span className="text-gray-500">Last Irrigation:</span> {zone.lastIrrigation}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`auto-mode-${zone.id}`} className="text-sm">
                        Auto Mode
                      </Label>
                      <Switch
                        id={`auto-mode-${zone.id}`}
                        checked={zone.autoMode}
                        onCheckedChange={() => toggleAutoMode(zone.id)}
                      />
                    </div>

                    <Button
                      variant={zone.status === "active" ? "destructive" : "default"}
                      className={zone.status === "active" ? "" : "bg-green-600 hover:bg-green-700"}
                      onClick={() => toggleIrrigation(zone.id)}
                      disabled={zone.autoMode}
                    >
                      {zone.status === "active" ? "Stop Irrigation" : "Start Irrigation"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SidebarInset>
    </div>
  )
}
