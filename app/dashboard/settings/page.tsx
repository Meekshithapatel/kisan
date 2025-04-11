"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Globe, Lock, Moon, Smartphone, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSelector } from "@/components/language-selector"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: {
      weather: true,
      irrigation: true,
      marketplace: false,
      payments: true,
    },
    privacy: {
      shareData: false,
      locationTracking: true,
    },
  })

  const handleToggleSetting = (category: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof (typeof prev)[keyof typeof prev]],
      },
    }))

    toast({
      title: "Setting Updated",
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} has been ${
        settings[category as keyof typeof settings][setting as keyof (typeof settings)[keyof typeof settings]]
          ? "disabled"
          : "enabled"
      }.`,
    })
  }

  const handleToggleDarkMode = () => {
    setSettings((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }))

    toast({
      title: "Theme Updated",
      description: `Dark mode has been ${settings.darkMode ? "disabled" : "enabled"}.`,
    })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" asChild>
            <a href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how Hey Kisan looks on your device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <Switch checked={settings.darkMode} onCheckedChange={handleToggleDarkMode} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Choose your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5" />
                      <div>
                        <p className="font-medium">App Language</p>
                        <p className="text-sm text-gray-500">Select the language for the app interface</p>
                      </div>
                    </div>
                    <div className="w-[200px]">
                      <LanguageSelector />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile App</CardTitle>
                  <CardDescription>Download our mobile app for better experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Smartphone className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Get Mobile App</p>
                        <p className="text-sm text-gray-500">Available for Android and iOS</p>
                      </div>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weather Alerts</Label>
                    <p className="text-sm text-gray-500">Receive notifications about weather changes</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weather}
                    onCheckedChange={() => handleToggleSetting("notifications", "weather")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Irrigation Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about irrigation schedules and issues</p>
                  </div>
                  <Switch
                    checked={settings.notifications.irrigation}
                    onCheckedChange={() => handleToggleSetting("notifications", "irrigation")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketplace Updates</Label>
                    <p className="text-sm text-gray-500">Receive notifications about new products and offers</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketplace}
                    onCheckedChange={() => handleToggleSetting("notifications", "marketplace")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Payment Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified about payment confirmations and dues</p>
                  </div>
                  <Switch
                    checked={settings.notifications.payments}
                    onCheckedChange={() => handleToggleSetting("notifications", "payments")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Sharing</Label>
                    <p className="text-sm text-gray-500">Share anonymous usage data to improve our services</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareData}
                    onCheckedChange={() => handleToggleSetting("privacy", "shareData")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Location Tracking</Label>
                    <p className="text-sm text-gray-500">Allow location tracking for weather and soil analysis</p>
                  </div>
                  <Switch
                    checked={settings.privacy.locationTracking}
                    onCheckedChange={() => handleToggleSetting("privacy", "locationTracking")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Lock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
