"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Leaf, Sprout } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type CropStatus = {
  name: string
  progress: number
  daysRemaining: number
  waterStatus: "low" | "optimal" | "high"
  nextIrrigation: string
}

export function CropManagementCard() {
  const [currentCrop, setCurrentCrop] = useState<CropStatus | null>({
    name: "Rice",
    progress: 45,
    daysRemaining: 65,
    waterStatus: "optimal",
    nextIrrigation: "Tomorrow",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-green-600" />
          Crop Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentCrop ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{currentCrop.name}</h3>
                <p className="text-sm text-gray-500">{currentCrop.daysRemaining} days remaining</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Sprout className="h-5 w-5 text-green-600" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Growth Progress</span>
                <span>{currentCrop.progress}%</span>
              </div>
              <Progress value={currentCrop.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-500 mb-1">Water Status</div>
                <div
                  className={`font-medium ${
                    currentCrop.waterStatus === "low"
                      ? "text-amber-500"
                      : currentCrop.waterStatus === "optimal"
                        ? "text-green-500"
                        : "text-blue-500"
                  }`}
                >
                  {currentCrop.waterStatus.charAt(0).toUpperCase() + currentCrop.waterStatus.slice(1)}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-500 mb-1">Next Irrigation</div>
                <div className="font-medium">{currentCrop.nextIrrigation}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sprout className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-medium text-gray-700 mb-1">No Active Crops</h3>
            <p className="text-sm text-gray-500 mb-4">Start by adding a crop to manage</p>
            <Button className="bg-green-600 hover:bg-green-700">Add Crop</Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/crop-management" className="w-full">
          <Button variant="outline" className="w-full justify-between">
            <span>View All Crop Details</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
