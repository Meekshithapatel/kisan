"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type PredictionResult = {
  crop: string
  confidence: number
  growthDuration: number
  waterRequirements: string
  fertilizers: string[]
  expectedYield: string
  marketValue: string
}

export function CropPredictionForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock prediction result
      const mockResult: PredictionResult = {
        crop: "Rice",
        confidence: 87,
        growthDuration: 105,
        waterRequirements: "High (Regular irrigation needed)",
        fertilizers: ["Nitrogen-rich fertilizer", "Phosphorus supplement"],
        expectedYield: "5.2 tons per hectare",
        marketValue: "₹22,000 per ton",
      }

      setResult(mockResult)
      setLoading(false)

      toast({
        title: "Prediction Complete",
        description: `Based on your inputs, ${mockResult.crop} is recommended with ${mockResult.confidence}% confidence.`,
      })
    }, 2000)
  }

  const resetForm = () => {
    setResult(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Crop Prediction</CardTitle>
          <CardDescription>Enter your land details to get crop recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select defaultValue="clay">
                <SelectTrigger id="soil-type">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="silty">Silty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Current Season</Label>
              <Select defaultValue="summer">
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="land-area">Land Area (in acres)</Label>
              <Input id="land-area" type="number" placeholder="Enter land area" defaultValue="2.5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="water-availability">Water Availability</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="water-availability">
                  <SelectValue placeholder="Select water availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Rainfed only)</SelectItem>
                  <SelectItem value="medium">Medium (Limited irrigation)</SelectItem>
                  <SelectItem value="high">High (Regular irrigation)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-preference">Market Preference</Label>
              <Select defaultValue="local">
                <SelectTrigger id="market-preference">
                  <SelectValue placeholder="Select market preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Market</SelectItem>
                  <SelectItem value="export">Export Market</SelectItem>
                  <SelectItem value="organic">Organic Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Analyzing...
                </>
              ) : (
                "Predict Best Crop"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>Based on your land details and current conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{result.crop}</h3>
                  <p className="text-sm text-gray-500">Recommended Crop</p>
                </div>
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-green-600">{result.confidence}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Growth Duration</div>
                  <div className="font-medium">{result.growthDuration} days</div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Water Requirements</div>
                  <div className="font-medium text-sm">{result.waterRequirements}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Expected Yield</div>
                  <div className="font-medium">{result.expectedYield}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Market Value</div>
                  <div className="font-medium">{result.marketValue}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-500 mb-2">Recommended Fertilizers</div>
                <ul className="space-y-1">
                  {result.fertilizers.map((fertilizer, index) => (
                    <li key={index} className="text-sm">
                      • {fertilizer}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full" onClick={resetForm}>
                Start New Prediction
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
