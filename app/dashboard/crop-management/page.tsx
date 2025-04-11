"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Droplets, Leaf, Plus, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { CropPredictionForm } from "@/components/crop-prediction-form"
import { CropDetailsForm } from "@/components/crop-details-form"

type CropData = {
  id: number
  name: string
  plantedDate: string
  harvestDate: string
  progress: number
  waterStatus: "low" | "optimal" | "high"
  fertilizers: string[]
  area: string
}

export default function CropManagementPage() {
  const [activeTab, setActiveTab] = useState("current-crops")

  const cropData: CropData[] = [
    {
      id: 1,
      name: "Rice",
      plantedDate: "2025-02-15",
      harvestDate: "2025-05-30",
      progress: 45,
      waterStatus: "optimal",
      fertilizers: ["Nitrogen-rich", "Phosphorus"],
      area: "2.5 acres",
    },
    {
      id: 2,
      name: "Wheat",
      plantedDate: "2025-01-10",
      harvestDate: "2025-04-20",
      progress: 70,
      waterStatus: "low",
      fertilizers: ["Potassium-rich"],
      area: "1.8 acres",
    },
  ]

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
            <h1 className="text-2xl font-bold">Crop Management</h1>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Add New Crop
          </Button>
        </div>

        <Tabs defaultValue="current-crops" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="current-crops">Current Crops</TabsTrigger>
            <TabsTrigger value="crop-prediction">Crop Prediction</TabsTrigger>
            <TabsTrigger value="crop-details">Crop Details</TabsTrigger>
          </TabsList>

          <TabsContent value="current-crops">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cropData.map((crop) => (
                <Card key={crop.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sprout className="mr-2 h-5 w-5 text-green-600" />
                      {crop.name}
                    </CardTitle>
                    <CardDescription>{crop.area}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Progress</span>
                          <span>{crop.progress}%</span>
                        </div>
                        <Progress value={crop.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div className="text-sm">
                            <div className="text-gray-500">Planted</div>
                            <div>{new Date(crop.plantedDate).toLocaleDateString()}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div className="text-sm">
                            <div className="text-gray-500">Harvest</div>
                            <div>{new Date(crop.harvestDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-xs text-gray-500">Water Status</span>
                          </div>
                          <div
                            className={`font-medium ${
                              crop.waterStatus === "low"
                                ? "text-amber-500"
                                : crop.waterStatus === "optimal"
                                  ? "text-green-500"
                                  : "text-blue-500"
                            }`}
                          >
                            {crop.waterStatus.charAt(0).toUpperCase() + crop.waterStatus.slice(1)}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-gray-500">Fertilizers</span>
                          </div>
                          <div className="font-medium text-sm truncate">{crop.fertilizers.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crop-prediction">
            <CropPredictionForm />
          </TabsContent>

          <TabsContent value="crop-details">
            <CropDetailsForm />
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
