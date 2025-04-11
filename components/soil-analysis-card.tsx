"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export function SoilAnalysisCard() {
  const { toast } = useToast()
  const [analyzing, setAnalyzing] = useState(false)
  const [soilData, setSoilData] = useState<null | {
    type: string
    moisture: number
    ph: number
    nitrogen: number
    phosphorus: number
    potassium: number
  }>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
      // Mock soil analysis data
      const mockSoilData = {
        type: ["Clay", "Sandy", "Loamy", "Silty"][Math.floor(Math.random() * 4)],
        moisture: Math.floor(Math.random() * 60) + 20, // 20-80%
        ph: (Math.random() * 3 + 5).toFixed(1), // 5.0-8.0
        nitrogen: Math.floor(Math.random() * 100), // 0-100 mg/kg
        phosphorus: Math.floor(Math.random() * 100), // 0-100 mg/kg
        potassium: Math.floor(Math.random() * 100), // 0-100 mg/kgum: Math.floor(Math.random() * 100), // 0-100 mg/kg
      }

      setSoilData(mockSoilData)
      setAnalyzing(false)

      toast({
        title: "Soil Analysis Complete",
        description: `Your soil is identified as ${mockSoilData.type} type`,
      })
    }, 2000)
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setSoilData(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Analysis</CardTitle>
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
                <input id="soil-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img src={selectedImage || "/placeholder.svg"} alt="Soil sample" className="w-full h-full object-cover" />
            </div>

            {soilData ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Soil Type:</span>
                    <span className="font-medium">{soilData.type}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Moisture Level:</span>
                    <span className="font-medium">{soilData.moisture}%</span>
                  </div>
                  <Progress value={soilData.moisture} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>pH Level:</span>
                    <span className="font-medium">{soilData.ph}</span>
                  </div>
                  <Progress value={(Number.parseFloat(soilData.ph) - 5) * 20} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-xs text-gray-500">Nitrogen</div>
                    <div className="font-medium">{soilData.nitrogen} mg/kg</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-xs text-gray-500">Phosphorus</div>
                    <div className="font-medium">{soilData.phosphorus} mg/kg</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-xs text-gray-500">Potassium</div>
                    <div className="font-medium">{soilData.potassium} mg/kg</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                {analyzing ? (
                  <Button disabled className="gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Analyzing...
                  </Button>
                ) : (
                  <Button onClick={analyzeSoil} className="bg-green-600 hover:bg-green-700">
                    Analyze Soil
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      {selectedImage && (
        <CardFooter className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={resetAnalysis}>
            Reset
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
