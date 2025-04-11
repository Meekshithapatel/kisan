"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Cloud, CloudRain, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

type WeatherData = {
  date: string
  temp: {
    min: number
    max: number
    current: number
  }
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "partly-cloudy"
  humidity: number
  windSpeed: number
  precipitation: number
  uvIndex: number
}

type ForecastData = {
  date: string
  temp: {
    min: number
    max: number
  }
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "partly-cloudy"
  precipitation: number
}

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Mock current weather data
  const currentWeather: WeatherData = {
    date: new Date().toISOString(),
    temp: {
      min: 22,
      max: 32,
      current: 28,
    },

    condition: "partly-cloudy",
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    uvIndex: 6,
  }

  // Mock forecast data
  const forecastData: ForecastData[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)

    return {
      date: date.toISOString(),
      temp: {
        min: Math.floor(Math.random() * 10) + 18, // 18-28°C
        max: Math.floor(Math.random() * 10) + 25, // 25-35°C
      },
      condition: ["sunny", "cloudy", "rainy", "partly-cloudy", "stormy"][Math.floor(Math.random() * 5)] as any,
      precipitation: Math.floor(Math.random() * 100), // 0-100%
    }
  })

  // Mock historical data
  const historicalData: WeatherData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (i + 1))

    return {
      date: date.toISOString(),
      temp: {
        min: Math.floor(Math.random() * 10) + 18, // 18-28°C
        max: Math.floor(Math.random() * 10) + 25, // 25-35°C
        current: Math.floor(Math.random() * 15) + 20, // 20-35°C
      },
      condition: ["sunny", "cloudy", "rainy", "partly-cloudy", "stormy"][Math.floor(Math.random() * 5)] as any,
      humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      precipitation: Math.floor(Math.random() * 100), // 0-100%
      uvIndex: Math.floor(Math.random() * 10) + 1, // 1-10
    }
  })

  const getWeatherIcon = (condition: string, size = 6) => {
    switch (condition) {
      case "sunny":
        return <Sun className={`h-${size} w-${size} text-yellow-500`} />
      case "cloudy":
        return <Cloud className={`h-${size} w-${size} text-gray-500`} />
      case "rainy":
        return <CloudRain className={`h-${size} w-${size} text-blue-500`} />
      case "stormy":
        return <CloudRain className={`h-${size} w-${size} text-purple-500`} />
      case "partly-cloudy":
        return (
          <div className="relative">
            <Sun className={`h-${size} w-${size} text-yellow-500`} />
            <Cloud className={`h-${size - 2} w-${size - 2} text-gray-500 absolute -bottom-1 -right-1`} />
          </div>
        )
      default:
        return <Sun className={`h-${size} w-${size} text-yellow-500`} />
    }
  }

  const getConditionText = (condition: string) => {
    switch (condition) {
      case "partly-cloudy":
        return "Partly Cloudy"
      default:
        return condition.charAt(0).toUpperCase() + condition.slice(1)
    }
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
            <h1 className="text-2xl font-bold">Weather Forecast</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="north">North Field</SelectItem>
                <SelectItem value="east">East Field</SelectItem>
                <SelectItem value="south">South Field</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="current">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Weather</TabsTrigger>
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex flex-col items-center">
                      <div className="text-6xl font-bold mb-2">{currentWeather.temp.current}°C</div>
                      <div className="flex flex-col items-center">
                        {getWeatherIcon(currentWeather.condition, 12)}
                        <div className="mt-2 text-lg">{getConditionText(currentWeather.condition)}</div>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <Thermometer className="h-6 w-6 text-red-500" />
                        <div>
                          <div className="text-sm text-gray-500">High / Low</div>
                          <div className="font-medium">
                            {currentWeather.temp.max}° / {currentWeather.temp.min}°
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <Droplets className="h-6 w-6 text-blue-500" />
                        <div>
                          <div className="text-sm text-gray-500">Humidity</div>
                          <div className="font-medium">{currentWeather.humidity}%</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <Wind className="h-6 w-6 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-500">Wind Speed</div>
                          <div className="font-medium">{currentWeather.windSpeed} km/h</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <CloudRain className="h-6 w-6 text-blue-500" />
                        <div>
                          <div className="text-sm text-gray-500">Precipitation</div>
                          <div className="font-medium">{currentWeather.precipitation}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Irrigation Advisory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h3 className="font-medium text-amber-800 mb-1">Moderate Water Stress</h3>
                      <p className="text-sm text-amber-700">
                        Current conditions indicate moderate water stress for crops. Consider irrigation in the next 24
                        hours.
                      </p>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Recommended Action:</div>
                      <div className="font-medium">Schedule irrigation for tomorrow morning</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Water Requirement:</div>
                      <div className="font-medium">25mm for rice fields</div>
                      <div className="font-medium">15mm for wheat fields</div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">Schedule Irrigation</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hourly Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex overflow-x-auto pb-2 space-x-6">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = new Date()
                    hour.setHours(hour.getHours() + i)
                    const temp = Math.floor(
                      currentWeather.temp.min +
                        (currentWeather.temp.max - currentWeather.temp.min) *
                          Math.sin((i / 24) * Math.PI + (i > 12 ? Math.PI : 0)),
                    )
                    const condition =
                      i > 6 && i < 18
                        ? ["sunny", "partly-cloudy"][Math.floor(Math.random() * 2)]
                        : ["cloudy", "partly-cloudy"][Math.floor(Math.random() * 2)]

                    return (
                      <div key={i} className="flex flex-col items-center min-w-[60px]">
                        <div className="text-sm text-gray-500">{hour.getHours().toString().padStart(2, "0")}:00</div>
                        <div className="my-2">{getWeatherIcon(condition as any, 5)}</div>
                        <div className="font-medium">{temp}°</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {forecastData.map((day, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium mb-2">
                        {index === 0
                          ? "Today"
                          : index === 1
                            ? "Tomorrow"
                            : new Date(day.date).toLocaleDateString(undefined, { weekday: "long" })}
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        {new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </div>

                      <div className="mb-4">{getWeatherIcon(day.condition, 10)}</div>

                      <div className="text-xl font-bold mb-1">
                        {day.temp.max}° <span className="text-gray-400 font-normal">/ {day.temp.min}°</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">{getConditionText(day.condition)}</div>

                      <div className="flex items-center">
                        <CloudRain className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm">{day.precipitation}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Crop Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-1">Favorable Growing Conditions</h3>
                    <p className="text-sm text-green-700">
                      The upcoming weather forecast shows favorable conditions for crop growth with adequate rainfall
                      and moderate temperatures.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Rice Fields</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Expected rainfall sufficient for growth</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Monitor for pest activity due to humidity</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Wheat Fields</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Supplemental irrigation may be needed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Good conditions for fertilizer application</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Vegetable Garden</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Protect from potential heavy rain on day 5</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Ideal conditions for planting new crops</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-1">
                  {historicalData.slice(0, 30).map((day, index) => {
                    const height = (day.temp.max / 40) * 100
                    const minHeight = (day.temp.min / 40) * 100

                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full flex flex-col items-center">
                          <div className="w-full bg-red-200 rounded-t relative" style={{ height: `${height}%` }}>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">{day.temp.max}°</div>
                          </div>
                          <div className="w-full bg-blue-200 rounded-b" style={{ height: `${minHeight}%` }}>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">{day.temp.min}°</div>
                          </div>
                        </div>
                        {index % 5 === 0 && (
                          <div className="mt-8 text-xs text-gray-500">
                            {new Date(day.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rainfall Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-1">
                    {historicalData.slice(0, 14).map((day, index) => {
                      const height = (day.precipitation / 100) * 100

                      return (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full bg-blue-400 rounded-t" style={{ height: `${height}%` }}></div>
                          {index % 2 === 0 && (
                            <div className="mt-2 text-xs text-gray-500">
                              {new Date(day.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weather Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-yellow-500" />
                        <span>Sunny Days</span>
                      </div>
                      <span className="font-medium">
                        {historicalData.filter((day) => day.condition === "sunny").length} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud className="h-5 w-5 text-gray-500" />
                        <span>Cloudy Days</span>
                      </div>
                      <span className="font-medium">
                        {historicalData.filter((day) => day.condition === "cloudy").length} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        <span>Rainy Days</span>
                      </div>
                      <span className="font-medium">
                        {historicalData.filter((day) => day.condition === "rainy").length} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <span>Average Temperature</span>
                      </div>
                      <span className="font-medium">
                        {Math.round(
                          historicalData.reduce((sum, day) => sum + day.temp.current, 0) / historicalData.length,
                        )}
                        °C
                      </span>
                    </div>
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
