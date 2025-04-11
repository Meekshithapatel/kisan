"use client"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Cloud,
  CloudRain,
  Droplets,
  Leaf,
  RefreshCw,
  ShoppingCart,
  Sun,
  Tractor,
  Wind,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { translate } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMin = Math.floor(diffMs / 60000)

    if (diffMin < 1) return translate("justNow")
    if (diffMin < 60) return `${diffMin} ${translate("minutesAgo")}`

    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `${diffHours} ${diffHours > 1 ? translate("hoursPlural") : translate("hoursSingular")}`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} ${diffDays > 1 ? translate("daysPlural") : translate("daysSingular")}`
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6 overflow-auto">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-500">{translate("loadingDashboard")}</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2" />
            <div>
              <h1 className="text-2xl font-bold">{translate("dashboardTitle")}</h1>
              <p className="text-gray-500 text-sm">
                {translate("welcomeBack")}, Ishvik | {translate("lastUpdated")}: {formatTimeAgo(lastRefreshed)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={refreshData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? translate("refreshing") : translate("refresh")}
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800">{translate("currentWeather")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-800">28°C</div>
                  <div className="text-sm text-green-700">{translate("partlyCloudy")}</div>
                </div>
                <div className="relative">
                  <Sun className="h-10 w-10 text-yellow-500" />
                  <Cloud className="h-6 w-6 text-gray-400 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex flex-col items-center">
                  <Droplets className="h-4 w-4 text-blue-500 mb-1" />
                  <span className="text-xs text-green-800">65%</span>
                  <span className="text-xs text-green-700">{translate("humidity")}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Wind className="h-4 w-4 text-blue-500 mb-1" />
                  <span className="text-xs text-green-800">12 km/h</span>
                  <span className="text-xs text-green-700">{translate("wind")}</span>
                </div>
                <div className="flex flex-col items-center">
                  <CloudRain className="h-4 w-4 text-blue-500 mb-1" />
                  <span className="text-xs text-green-800">20%</span>
                  <span className="text-xs text-green-700">{translate("precipitation")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">{translate("soilMoisture")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-3xl font-bold text-blue-800">45%</div>
                  <div className="text-sm text-blue-700">{translate("average")}</div>
                </div>
                <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-800">{translate("northField")}</span>
                    <span className="text-blue-800">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-blue-200" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-800">{translate("eastField")}</span>
                    <span className="text-blue-800">28%</span>
                  </div>
                  <Progress value={28} className="h-2 bg-blue-200" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-800">{translate("southField")}</span>
                    <span className="text-blue-800">55%</span>
                  </div>
                  <Progress value={55} className="h-2 bg-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">{translate("cropStatus")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-3xl font-bold text-amber-800">{translate("rice")}</div>
                  <div className="text-sm text-amber-700">65 {translate("daysRemaining")}</div>
                </div>
                <div className="h-12 w-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-amber-800">{translate("growthProgress")}</span>
                    <span className="text-amber-800">45%</span>
                  </div>
                  <Progress value={45} className="h-2 bg-amber-200" />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white/50 p-2 rounded-md">
                    <div className="text-xs text-amber-800">{translate("waterStatus")}</div>
                    <div className="text-sm font-medium text-green-600">{translate("optimal")}</div>
                  </div>
                  <div className="bg-white/50 p-2 rounded-md">
                    <div className="text-xs text-amber-800">{translate("nextIrrigation")}</div>
                    <div className="text-sm font-medium text-amber-800">{translate("tomorrow")}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{translate("activityOverview")}</CardTitle>
                <CardDescription>{translate("farmActivities")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">{translate("all")}</TabsTrigger>
                    <TabsTrigger value="irrigation">{translate("irrigation")}</TabsTrigger>
                    <TabsTrigger value="soil">{translate("soil")}</TabsTrigger>
                    <TabsTrigger value="crops">{translate("crops")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("irrigationCompleted")}</h4>
                          <span className="text-xs text-gray-500">2 {translate("hoursAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("northFieldIrrigation")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <BarChart3 className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("soilAnalysisResults")}</h4>
                          <span className="text-xs text-gray-500">{translate("yesterday")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("eastFieldSoil")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("cropTreatmentApplied")}</h4>
                          <span className="text-xs text-gray-500">2 {translate("daysAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("appliedPesticide")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                        <ShoppingCart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("marketplacePurchase")}</h4>
                          <span className="text-xs text-gray-500">3 {translate("daysAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("purchasedFertilizer")}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="irrigation" className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("irrigationCompleted")}</h4>
                          <span className="text-xs text-gray-500">2 {translate("hoursAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("northFieldIrrigation")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <Tractor className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("irrigationSystemMaintenance")}</h4>
                          <span className="text-xs text-gray-500">5 {translate("daysAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("performedMaintenance")}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="soil" className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <BarChart3 className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("soilAnalysisResults")}</h4>
                          <span className="text-xs text-gray-500">{translate("yesterday")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("eastFieldSoil")}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="crops" className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{translate("cropTreatmentApplied")}</h4>
                          <span className="text-xs text-gray-500">2 {translate("daysAgo")}</span>
                        </div>
                        <p className="text-sm text-gray-600">{translate("appliedPesticide")}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{translate("weatherForecast")}</CardTitle>
                <CardDescription>{translate("weatherPrediction")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex overflow-x-auto pb-2 space-x-6">
                  {Array.from({ length: 7 }, (_, i) => {
                    const day = new Date()
                    day.setDate(day.getDate() + i)
                    const temp = Math.floor(Math.random() * 10) + 25
                    const conditions = ["sunny", "partly-cloudy", "cloudy", "rainy"][Math.floor(Math.random() * 4)]

                    const getIcon = (condition: string) => {
                      switch (condition) {
                        case "sunny":
                          return <Sun className="h-8 w-8 text-yellow-500" />
                        case "partly-cloudy":
                          return (
                            <div className="relative">
                              <Sun className="h-8 w-8 text-yellow-500" />
                              <Cloud className="h-5 w-5 text-gray-400 absolute -bottom-1 -right-1" />
                            </div>
                          )
                        case "cloudy":
                          return <Cloud className="h-8 w-8 text-gray-400" />
                        case "rainy":
                          return <CloudRain className="h-8 w-8 text-blue-500" />
                        default:
                          return <Sun className="h-8 w-8 text-yellow-500" />
                      }
                    }

                    return (
                      <div key={i} className="flex flex-col items-center min-w-[80px]">
                        <div className="text-sm font-medium">
                          {i === 0 ? translate("today") : day.toLocaleDateString(undefined, { weekday: "short" })}
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {day.toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                        </div>
                        <div className="mb-2">{getIcon(conditions)}</div>
                        <div className="text-lg font-bold">{temp}°C</div>
                        <div className="text-xs text-gray-500 capitalize">{translate(conditions.replace("-", ""))}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{translate("alerts")}</CardTitle>
                <CardDescription>{translate("importantNotifications")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <h4 className="font-medium text-red-800">{translate("lowSoilMoisture")}</h4>
                  </div>
                  <p className="text-sm text-red-700">{translate("irrigationRecommended")}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-red-800">
                      {translate("viewDetails")}
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <h4 className="font-medium text-amber-800">{translate("fertilizerApplicationDue")}</h4>
                  </div>
                  <p className="text-sm text-amber-700">{translate("nitrogenFertilizer")}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-amber-800">
                      {translate("viewDetails")}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <h4 className="font-medium text-blue-800">{translate("weatherAlert")}</h4>
                  </div>
                  <p className="text-sm text-blue-700">{translate("rainfallExpected")}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-blue-800">
                      {translate("viewDetails")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{translate("marketPrices")}</CardTitle>
                <CardDescription>{translate("currentCropPrices")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-medium">🌾</span>
                    </div>
                    <div>
                      <div className="font-medium">{translate("rice")}</div>
                      <div className="text-xs text-gray-500">{translate("perQuintal")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹2,200</div>
                    <div className="text-xs text-green-600">↑ 5.2%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-medium">🌽</span>
                    </div>
                    <div>
                      <div className="font-medium">{translate("wheat")}</div>
                      <div className="text-xs text-gray-500">{translate("perQuintal")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹1,850</div>
                    <div className="text-xs text-red-600">↓ 2.1%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-medium">🥔</span>
                    </div>
                    <div>
                      <div className="font-medium">{translate("potatoes")}</div>
                      <div className="text-xs text-gray-500">{translate("perQuintal")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹1,200</div>
                    <div className="text-xs text-green-600">↑ 8.5%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-medium">🧅</span>
                    </div>
                    <div>
                      <div className="font-medium">{translate("onions")}</div>
                      <div className="text-xs text-gray-500">{translate("perQuintal")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹1,500</div>
                    <div className="text-xs text-green-600">↑ 12.3%</div>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4">
                <Link href="/dashboard/marketplace">
                  <Button variant="outline" size="sm" className="w-full">
                    <span>{translate("viewMarketplace")}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{translate("upcomingTasks")}</CardTitle>
                <CardDescription>{translate("scheduledActivities")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{translate("fertilizerApplication")}</div>
                    <div className="text-xs text-gray-500">{translate("tomorrow")}, 7:00 AM</div>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">
                    {translate("scheduled")}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{translate("irrigationMaintenance")}</div>
                    <div className="text-xs text-gray-500">May 15, 9:00 AM</div>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">{translate("pending")}</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Tractor className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">{translate("equipmentService")}</div>
                    <div className="text-xs text-gray-500">May 20, 10:00 AM</div>
                  </div>
                  <Badge className="ml-auto bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {translate("scheduled")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
