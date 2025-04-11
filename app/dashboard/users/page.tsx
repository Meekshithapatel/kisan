"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, Download, MoreHorizontal, Plus, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-context"

type UserType = {
  id: number
  name: string
  phone: string
  email: string
  role: "admin" | "farmer" | "agent"
  status: "active" | "inactive" | "pending"
  lastActive: string
  location: string
  joinDate: string
  avatar?: string
}

export default function UsersPage() {
  const { toast } = useToast()
  const { translate } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock user data
  const users: UserType[] = [
    {
      id: 1,
      name: "Ramesh Kumar",
      phone: "+91 9876543210",
      email: "ramesh@example.com",
      role: "farmer",
      status: "active",
      lastActive: "Today at 10:30 AM",
      location: "Guntur, Andhra Pradesh",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Suresh Patel",
      phone: "+91 9876543211",
      email: "suresh@example.com",
      role: "farmer",
      status: "active",
      lastActive: "Yesterday at 3:45 PM",
      location: "Ahmedabad, Gujarat",
      joinDate: "2024-02-10",
    },
    {
      id: 3,
      name: "Lakshmi Devi",
      phone: "+91 9876543212",
      email: "lakshmi@example.com",
      role: "farmer",
      status: "inactive",
      lastActive: "3 days ago",
      location: "Coimbatore, Tamil Nadu",
      joinDate: "2023-11-05",
    },
    {
      id: 4,
      name: "Priya Singh",
      phone: "+91 9876543213",
      email: "priya@example.com",
      role: "agent",
      status: "active",
      lastActive: "Today at 9:15 AM",
      location: "Jaipur, Rajasthan",
      joinDate: "2024-03-20",
    },
    {
      id: 5,
      name: "Rajesh Sharma",
      phone: "+91 9876543214",
      email: "rajesh@example.com",
      role: "admin",
      status: "active",
      lastActive: "Just now",
      location: "Delhi, NCR",
      joinDate: "2023-08-12",
    },
    {
      id: 6,
      name: "Ananya Reddy",
      phone: "+91 9876543215",
      email: "ananya@example.com",
      role: "farmer",
      status: "pending",
      lastActive: "Never",
      location: "Hyderabad, Telangana",
      joinDate: "2024-04-01",
    },
    {
      id: 7,
      name: "Vikram Mehta",
      phone: "+91 9876543216",
      email: "vikram@example.com",
      role: "agent",
      status: "active",
      lastActive: "Yesterday at 5:20 PM",
      location: "Mumbai, Maharashtra",
      joinDate: "2023-10-15",
    },
    {
      id: 8,
      name: "Deepak Verma",
      phone: "+91 9876543217",
      email: "deepak@example.com",
      role: "farmer",
      status: "active",
      lastActive: "Today at 8:45 AM",
      location: "Lucknow, Uttar Pradesh",
      joinDate: "2024-01-30",
    },
    {
      id: 9,
      name: "Meena Kumari",
      phone: "+91 9876543218",
      email: "meena@example.com",
      role: "farmer",
      status: "inactive",
      lastActive: "1 week ago",
      location: "Patna, Bihar",
      joinDate: "2023-12-05",
    },
    {
      id: 10,
      name: "Arjun Nair",
      phone: "+91 9876543219",
      email: "arjun@example.com",
      role: "admin",
      status: "active",
      lastActive: "Today at 11:10 AM",
      location: "Kochi, Kerala",
      joinDate: "2023-09-22",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      (activeTab === "all" ||
        (activeTab === "farmers" && user.role === "farmer") ||
        (activeTab === "agents" && user.role === "agent") ||
        (activeTab === "admins" && user.role === "admin")) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleStatusChange = (userId: number, newStatus: "active" | "inactive") => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      toast({
        title: "User Status Updated",
        description: `${user.name}'s status has been changed to ${newStatus}.`,
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "farmer":
        return "bg-green-100 text-green-800"
      case "agent":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-500">Loading users...</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold">{translate("users")}</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-sm text-gray-500">Across all roles</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "farmer").length}</div>
              <p className="text-sm text-gray-500">
                {users.filter((u) => u.role === "farmer" && u.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "agent").length}</div>
              <p className="text-sm text-gray-500">
                {users.filter((u) => u.role === "agent" && u.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "admin").length}</div>
              <p className="text-sm text-gray-500">
                {users.filter((u) => u.role === "admin" && u.status === "active").length} active
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>User Management</CardTitle>
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users by name, email, or location..."
                className="pl-10 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-6 pt-2">
              <TabsList>
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Join Date</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-green-100 text-green-800">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500 hidden md:block">{user.email}</div>
                              <div className="text-sm text-gray-500 md:hidden">{user.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.location}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              {user.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                                  <X className="mr-2 h-4 w-4" /> Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                  <Check className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <User className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No users found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </SidebarInset>
    </div>
  )
}
