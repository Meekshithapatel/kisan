"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Camera, Download, Filter, Map, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

type SoilData = {
  id: number
  location: string
  date: string
  type: string
  moisture: number
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  recommendations: string[]
}

export default function SoilAnalysisPage() {
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Mock soil analysis data
  const soilData: SoilData[] = [
    {
      id: 1,
      location: "North Field",
      date: "2025-04-05",
      type: "Clay",
      moisture: 65,
      ph: 6.8,
      nitrogen: 75,
      phosphorus: 45,
      potassium: 60,
      organicMatter: 3.2,
      recommendations: [
        "Add nitrogen-rich fertilizer",
        "Maintain current irrigation schedule",
        "Consider crop rotation next season",
      ],
    },
    {
      id: 2,
      location: "East Field",
      date: "2025-04-01",
      type: "Sandy",
      moisture: 40,
      ph: 5.5,
      nitrogen: 30,
      phosphorus: 25,
      potassium: 40,
      organicMatter: 1.8,
      recommendations: [
        "Add organic matter to improve soil structure",
        "Apply lime to increase pH",
        "Increase irrigation frequency",
      ],
    },
    {
      id: 3,
      location: "South Field",
      date: "2025-03-28",
      type: "Loamy",
      moisture: 55,
      ph: 7.2,
      nitrogen: 60,
      phosphorus: 55,
      potassium: 65,
      organicMatter: 4.5,
      recommendations: ["Ideal soil conditions", "Continue current practices", "Monitor for pests"],
    },
  ]

  const filteredSoilData =
    selectedLocation === "all" ? soilData : soilData.filter((data) => data.location === selectedLocation)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeSoil = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a soil image to analyze",
        variant: "destructive",
      })
      return
    }

    setAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setAnalyzing(false)

      toast({
        title: "Soil Analysis Complete",
        description: "Your soil analysis results are ready",
      })
    }, 2000)
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
  }

  const getNutrientStatus = (value: number) => {
    if (value < 30) return { status: "Low", color: "text-red-500" }
    if (value < 60) return { status: "Medium", color: "text-yellow-500" }
    return { status: "High", color: "text-green-500" }
  }

  const getPHStatus = (value: number) => {
    if (value < 6.0) return { status: "Acidic", color: "text-red-500" }
    if (value > 7.5) return { status: "Alkaline", color: "text-blue-500" }
    return { status: "Neutral", color: "text-green-500" }
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
            <h1 className="text-2xl font-bold">Soil Analysis</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Map className="h-4 w-4" />
              View Map
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="history">
          <TabsList className="mb-6">
            <TabsTrigger value="history">Analysis History</TabsTrigger>
            <TabsTrigger value="new">New Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <div className="flex justify-between items-center mb-6">
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoilData.map((data) => (
                <Card key={data.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{data.location}</span>
                      <span className="text-sm font-normal text-gray-500">
                        {new Date(data.date).toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Soil Type:</span>
                      <span className="font-medium">{data.type}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Moisture Level:</span>
                        <span className="font-medium">{data.moisture}%</span>
                      </div>
                      <Progress value={data.moisture} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>pH Level:</span>
                        <span className={`font-medium ${getPHStatus(data.ph).color}`}>
                          {data.ph} ({getPHStatus(data.ph).status})
                        </span>
                      </div>
                      <Progress value={(data.ph - 4) * 20} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-500">Nitrogen</div>
                        <div className={`font-medium ${getNutrientStatus(data.nitrogen).color}`}>
                          {data.nitrogen} mg/kg
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-500">Phosphorus</div>
                        <div className={`font-medium ${getNutrientStatus(data.phosphorus).color}`}>
                          {data.phosphorus} mg/kg
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-500">Potassium</div>
                        <div className={`font-medium ${getNutrientStatus(data.potassium).color}`}>
                          {data.potassium} mg/kg
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Recommendations:</div>
                      <ul className="text-sm space-y-1">
                        {data.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>New Soil Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Upload a photo of your soil for analysis</p>
                    <div className="flex justify-center">
                      <label htmlFor="soil-image" className="cursor-pointer">
                        <Button variant="outline" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </Button>
                        <input
                          id="soil-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Soil sample"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <Select defaultValue="north">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North Field</SelectItem>
                          <SelectItem value="east">East Field</SelectItem>
                          <SelectItem value="south">South Field</SelectItem>
                          <SelectItem value="west">West Field</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={resetAnalysis}>
                          Reset
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={analyzeSoil} disabled={analyzing}>
                          {analyzing ? (
                            <>
                              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Soil"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
