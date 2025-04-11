"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export function CropDetailsForm() {
  const { toast } = useToast()
  const [plantDate, setPlantDate] = useState<Date | undefined>(new Date())
  const [fertilizers, setFertilizers] = useState<string[]>([])
  const [newFertilizer, setNewFertilizer] = useState("")

  const handleAddFertilizer = () => {
    if (newFertilizer.trim()) {
      setFertilizers([...fertilizers, newFertilizer.trim()])
      setNewFertilizer("")
    }
  }

  const handleRemoveFertilizer = (index: number) => {
    setFertilizers(fertilizers.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Crop Details Saved",
      description: "Your crop details have been successfully saved.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Details</CardTitle>
        <CardDescription>Enter details about your planted crop</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop-name">Crop Name</Label>
              <Input id="crop-name" placeholder="Enter crop name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop-variety">Crop Variety</Label>
              <Input id="crop-variety" placeholder="Enter crop variety" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="land-area">Land Area</Label>
              <div className="flex">
                <Input id="land-area" type="number" placeholder="Enter land area" />
                <Select defaultValue="acres">
                  <SelectTrigger className="w-[120px] ml-2">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="sqm">Square Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planting-date">Planting Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {plantDate ? format(plantDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={plantDate} onSelect={setPlantDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigation-type">Irrigation Type</Label>
              <Select defaultValue="drip">
                <SelectTrigger id="irrigation-type">
                  <SelectValue placeholder="Select irrigation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                  <SelectItem value="flood">Flood Irrigation</SelectItem>
                  <SelectItem value="manual">Manual Watering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="water-source">Water Source</Label>
              <Select defaultValue="well">
                <SelectTrigger id="water-source">
                  <SelectValue placeholder="Select water source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="well">Well Water</SelectItem>
                  <SelectItem value="canal">Canal Water</SelectItem>
                  <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                  <SelectItem value="river">River Water</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fertilizers Used</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add fertilizer"
                value={newFertilizer}
                onChange={(e) => setNewFertilizer(e.target.value)}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddFertilizer}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {fertilizers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {fertilizers.map((fertilizer, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    {fertilizer}
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveFertilizer(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="Enter any additional notes about your crop"
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Save Crop Details
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
