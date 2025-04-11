"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowUpDown, Calendar, CreditCard, Download, Filter, Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useLanguage } from "@/components/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/date-range-picker"

type Payment = {
  id: string
  date: string
  description: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: "bank" | "upi" | "card" | "cash"
  category: "purchase" | "sale" | "subscription" | "service"
  reference?: string
}

export default function PaymentsPage() {
  const { translate } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [selectedMethod, setSelectedMethod] = useState<string | undefined>()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock payment data
  const payments: Payment[] = [
    {
      id: "PAY-001",
      date: "2025-04-10",
      description: "Fertilizer Purchase",
      amount: 1200,
      status: "completed",
      method: "upi",
      category: "purchase",
      reference: "INV-2025-0410",
    },
    {
      id: "PAY-002",
      date: "2025-04-08",
      description: "Wheat Seeds",
      amount: 850,
      status: "completed",
      method: "bank",
      category: "purchase",
      reference: "INV-2025-0408",
    },
    {
      id: "PAY-003",
      date: "2025-04-05",
      description: "Irrigation Equipment",
      amount: 12500,
      status: "completed",
      method: "card",
      category: "purchase",
      reference: "INV-2025-0405",
    },
    {
      id: "PAY-004",
      date: "2025-04-01",
      description: "Crop Insurance Premium",
      amount: 5000,
      status: "pending",
      method: "bank",
      category: "service",
      reference: "INS-2025-0401",
    },
    {
      id: "PAY-005",
      date: "2025-03-28",
      description: "Pesticide Spray",
      amount: 650,
      status: "failed",
      method: "upi",
      category: "purchase",
      reference: "INV-2025-0328",
    },
    {
      id: "PAY-006",
      date: "2025-03-25",
      description: "Rice Sale",
      amount: 45000,
      status: "completed",
      method: "bank",
      category: "sale",
      reference: "SALE-2025-0325",
    },
    {
      id: "PAY-007",
      date: "2025-03-20",
      description: "Tractor Rental",
      amount: 2500,
      status: "completed",
      method: "cash",
      category: "service",
      reference: "SRV-2025-0320",
    },
    {
      id: "PAY-008",
      date: "2025-03-15",
      description: "Monthly Subscription",
      amount: 499,
      status: "completed",
      method: "card",
      category: "subscription",
      reference: "SUB-2025-0315",
    },
    {
      id: "PAY-009",
      date: "2025-03-10",
      description: "Vegetable Sale",
      amount: 12500,
      status: "completed",
      method: "upi",
      category: "sale",
      reference: "SALE-2025-0310",
    },
    {
      id: "PAY-010",
      date: "2025-03-05",
      description: "Soil Testing Service",
      amount: 1500,
      status: "completed",
      method: "cash",
      category: "service",
      reference: "SRV-2025-0305",
    },
    {
      id: "PAY-011",
      date: "2025-03-01",
      description: "Potato Sale",
      amount: 18000,
      status: "completed",
      method: "bank",
      category: "sale",
      reference: "SALE-2025-0301",
    },
    {
      id: "PAY-012",
      date: "2025-02-25",
      description: "Farm Equipment Repair",
      amount: 3500,
      status: "completed",
      method: "cash",
      category: "service",
      reference: "SRV-2025-0225",
    },
  ]

  const filteredPayments = payments
    .filter((payment) => {
      // Filter by tab
      if (activeTab === "income" && !payment.description.toLowerCase().includes("sale")) {
        return false
      }
      if (activeTab === "expenses" && payment.description.toLowerCase().includes("sale")) {
        return false
      }

      // Filter by search
      if (
        searchQuery &&
        !payment.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.reference?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by date range
      if (dateRange?.from && dateRange?.to) {
        const paymentDate = new Date(payment.date)
        if (paymentDate < dateRange.from || paymentDate > dateRange.to) {
          return false
        }
      }

      // Filter by category
      if (selectedCategory && payment.category !== selectedCategory) {
        return false
      }

      // Filter by payment method
      if (selectedMethod && payment.method !== selectedMethod) {
        return false
      }

      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case "bank":
        return "bg-blue-100 text-blue-800"
      case "upi":
        return "bg-purple-100 text-purple-800"
      case "card":
        return "bg-indigo-100 text-indigo-800"
      case "cash":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "purchase":
        return <CreditCard className="h-4 w-4 text-red-500" />
      case "sale":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "subscription":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "service":
        return <CreditCard className="h-4 w-4 text-purple-500" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const totalIncome = payments
    .filter((p) => p.status === "completed" && p.description.toLowerCase().includes("sale"))
    .reduce((sum, p) => sum + p.amount, 0)

  const totalExpenses = payments
    .filter((p) => p.status === "completed" && !p.description.toLowerCase().includes("sale"))
    .reduce((sum, p) => sum + p.amount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setDateRange(undefined)
    setSelectedCategory(undefined)
    setSelectedMethod(undefined)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-500">Loading payments...</p>
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
            <h1 className="text-2xl font-bold">{translate("payments")}</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Plus className="h-4 w-4" />
              New Payment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{formatCurrency(totalIncome)}</div>
              <p className="text-sm text-green-700">From crop sales and other income</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{formatCurrency(totalExpenses)}</div>
              <p className="text-sm text-red-700">From purchases and services</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(totalIncome - totalExpenses)}</div>
              <p className="text-sm text-blue-700">Current profit/loss</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>

                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search transactions..."
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

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                        {(dateRange || selectedCategory || selectedMethod) && (
                          <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600">
                            {(dateRange ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedMethod ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h3 className="font-medium">Filters</h3>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Date Range</h4>
                          <DateRangePicker value={dateRange} onChange={setDateRange} />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Category</h4>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="purchase">Purchase</SelectItem>
                              <SelectItem value="sale">Sale</SelectItem>
                              <SelectItem value="subscription">Subscription</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Payment Method</h4>
                          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                            <SelectTrigger>
                              <SelectValue placeholder="All Methods" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                          Reset Filters
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <TabsContent value="all">
                {filteredPayments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Date
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="hidden md:table-cell">Reference</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id} className="group hover:bg-gray-50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(payment.category)}
                                <span>{payment.description}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-gray-500">
                              {payment.reference || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getMethodBadgeColor(payment.method)}>
                                {payment.method === "upi"
                                  ? "UPI"
                                  : payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(payment.status)}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={
                                  payment.description.toLowerCase().includes("sale")
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                                }
                              >
                                {payment.description.toLowerCase().includes("sale") ? "+" : "-"}
                                {formatCurrency(payment.amount)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No transactions found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="income">
                {filteredPayments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Date
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="hidden md:table-cell">Reference</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id} className="group hover:bg-gray-50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(payment.category)}
                                <span>{payment.description}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-gray-500">
                              {payment.reference || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getMethodBadgeColor(payment.method)}>
                                {payment.method === "upi"
                                  ? "UPI"
                                  : payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(payment.status)}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-green-600 font-medium">+{formatCurrency(payment.amount)}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No income transactions found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expenses">
                {filteredPayments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Date
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="hidden md:table-cell">Reference</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id} className="group hover:bg-gray-50">
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(payment.category)}
                                <span>{payment.description}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-gray-500">
                              {payment.reference || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getMethodBadgeColor(payment.method)}>
                                {payment.method === "upi"
                                  ? "UPI"
                                  : payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(payment.status)}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-red-600 font-medium">-{formatCurrency(payment.amount)}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No expense transactions found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </SidebarInset>
    </div>
  )
}
