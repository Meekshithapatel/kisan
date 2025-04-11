"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type WeatherData = {
  date: string
  temp: number
  condition: "sunny" | "cloudy" | "rainy"
  humidity: number
  windSpeed: number
  precipitation: number
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from a weather API
    const mockWeatherData: WeatherData[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)

      return {
        date: date.toLocaleDateString(),
        temp: Math.floor(Math.random() * 15) + 20, // 20-35°C
        condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)] as any,
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        precipitation: Math.floor(Math.random() * 50), // 0-50%
      }
    })

    setWeatherData(mockWeatherData)
    setLoading(false)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <p>Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cloud className="mr-2 h-5 w-5" />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="grid grid-cols-7 mb-4">
            {weatherData.map((day, index) => (
              <TabsTrigger key={index} value={index === 0 ? "today" : `day-${index}`}>
                {index === 0 ? "Today" : new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
              </TabsTrigger>
            ))}
          </TabsList>

          {weatherData.map((day, index) => (
            <TabsContent key={index} value={index === 0 ? "today" : `day-${index}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getWeatherIcon(day.condition)}</div>
                    <div className="text-3xl font-bold">{day.temp}°C</div>
                    <div className="text-gray-500 capitalize">{day.condition}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="flex items-center mt-1">
                      <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="font-medium">{day.humidity}%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="flex items-center mt-1">
                      <span className="font-medium">{day.windSpeed} km/h</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Precipitation</div>
                    <div className="flex items-center mt-1">
                      <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="font-medium">{day.precipitation}%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Irrigation</div>
                    <div className="flex items-center mt-1">
                      <span className={`font-medium ${day.precipitation > 30 ? "text-green-500" : "text-amber-500"}`}>
                        {day.precipitation > 30 ? "Not Needed" : "Recommended"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
