"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "Ishvik",
    phone: "+91 6789991291",
    email: "ishvik@kisan.in",
    address: "mancherial",
    district: "Adilabad",
    state: "Telangana",
    pincode: "522001",
    landArea: "5.2 acres",
    farmingExperience: "15 years",
    preferredLanguage: "Telugu",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    })
  }

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleCancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
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
            <h1 className="text-2xl font-bold">Farmer Profile</h1>
          </div>
          {!isEditing ? (
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="personal">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isEditing ? (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500 text-sm">
                          <User className="h-4 w-4 mr-2" />
                          Full Name
                        </div>
                        <div className="font-medium">{profile.name}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone Number
                        </div>
                        <div className="font-medium">{profile.phone}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Address
                        </div>
                        <div className="font-medium">{profile.address}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">Email</div>
                        <div className="font-medium">{profile.email}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">District</div>
                        <div className="font-medium">{profile.district}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">State</div>
                        <div className="font-medium">{profile.state}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">PIN Code</div>
                        <div className="font-medium">{profile.pincode}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={editedProfile.name} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={editedProfile.address} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input
                          id="district"
                          name="district"
                          value={editedProfile.district}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={editedProfile.state} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input id="pincode" name="pincode" value={editedProfile.pincode} onChange={handleInputChange} />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farm">
            <Card>
              <CardHeader>
                <CardTitle>Farm Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isEditing ? (
                    <>
                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">Total Land Area</div>
                        <div className="font-medium">{profile.landArea}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">Farming Experience</div>
                        <div className="font-medium">{profile.farmingExperience}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="landArea">Total Land Area</Label>
                        <Input
                          id="landArea"
                          name="landArea"
                          value={editedProfile.landArea}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farmingExperience">Farming Experience</Label>
                        <Input
                          id="farmingExperience"
                          name="farmingExperience"
                          value={editedProfile.farmingExperience}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isEditing ? (
                    <>
                      <div className="space-y-1">
                        <div className="text-gray-500 text-sm">Preferred Language</div>
                        <div className="font-medium">{profile.preferredLanguage}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <Input
                          id="preferredLanguage"
                          name="preferredLanguage"
                          value={editedProfile.preferredLanguage}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
