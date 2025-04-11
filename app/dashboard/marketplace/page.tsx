"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Filter, Search, ShoppingCart, Star, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-context"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Product = {
  id: number
  name: string
  category: "fertilizer" | "seed" | "pesticide" | "equipment" | "crop"
  price: number
  seller: string
  rating: number
  image: string
  type: "buy" | "sell"
  description: string
  inStock: boolean
  discount?: number
  tags?: string[]
}

export default function MarketplacePage() {
  const { toast } = useToast()
  const { translate } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: "Organic Nitrogen Fertilizer (50kg)",
      category: "fertilizer",
      price: 1200,
      seller: "AgriChem Solutions",
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300&text=Fertilizer",
      type: "buy",
      description:
        "High-quality organic nitrogen fertilizer for all types of crops. Improves soil health and crop yield.",
      inStock: true,
      tags: ["organic", "nitrogen", "eco-friendly"],
    },
    {
      id: 2,
      name: "Premium Wheat Seeds (10kg)",
      category: "seed",
      price: 850,
      seller: "FarmSeeds Co.",
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300&text=Wheat+Seeds",
      type: "buy",
      description: "High-yield wheat seeds resistant to common diseases. Perfect for all soil types.",
      inStock: true,
      discount: 10,
      tags: ["wheat", "high-yield", "disease-resistant"],
    },
    {
      id: 3,
      name: "Organic Pesticide Spray (5L)",
      category: "pesticide",
      price: 650,
      seller: "EcoFarm Products",
      rating: 4.2,
      image: "/placeholder.svg?height=300&width=300&text=Pesticide",
      type: "buy",
      description: "Eco-friendly pesticide that effectively controls pests without harming beneficial insects.",
      inStock: true,
      tags: ["organic", "eco-friendly", "safe"],
    },
    {
      id: 4,
      name: "Drip Irrigation Kit (1 acre)",
      category: "equipment",
      price: 12500,
      seller: "IrriTech Systems",
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300&text=Irrigation+Kit",
      type: "buy",
      description: "Complete drip irrigation system for 1 acre. Includes pipes, drippers, filters, and connectors.",
      inStock: false,
      tags: ["irrigation", "water-saving", "efficient"],
    },
    {
      id: 5,
      name: "Organic Rice (100kg)",
      category: "crop",
      price: 4500,
      seller: "Farmer Ramesh",
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300&text=Organic+Rice",
      type: "sell",
      description: "Organically grown rice without any chemical fertilizers or pesticides. Harvested last week.",
      inStock: true,
      tags: ["organic", "rice", "chemical-free"],
    },
    {
      id: 6,
      name: "Fresh Vegetables Assortment (25kg)",
      category: "crop",
      price: 1800,
      seller: "Farmer Lakshmi",
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300&text=Fresh+Vegetables",
      type: "sell",
      description: "Assortment of fresh vegetables including tomatoes, potatoes, onions, and leafy greens.",
      inStock: true,
      discount: 15,
      tags: ["fresh", "vegetables", "assorted"],
    },
    {
      id: 7,
      name: "Tractor Rental (Daily)",
      category: "equipment",
      price: 2500,
      seller: "Farm Equipment Rentals",
      rating: 4.3,
      image: "/placeholder.svg?height=300&width=300&text=Tractor+Rental",
      type: "buy",
      description: "45HP tractor available for daily rental. Includes basic implements. Fuel not included.",
      inStock: true,
      tags: ["rental", "tractor", "equipment"],
    },
    {
      id: 8,
      name: "Soil Testing Kit (Professional)",
      category: "equipment",
      price: 3500,
      seller: "AgriTech Solutions",
      rating: 4.4,
      image: "/placeholder.svg?height=300&width=300&text=Soil+Testing+Kit",
      type: "buy",
      description: "Professional soil testing kit that measures pH, nitrogen, phosphorus, and potassium levels.",
      inStock: true,
      discount: 5,
      tags: ["testing", "soil", "analysis"],
    },
    {
      id: 9,
      name: "Organic Potatoes (50kg)",
      category: "crop",
      price: 2200,
      seller: "Farmer Suresh",
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300&text=Organic+Potatoes",
      type: "sell",
      description: "Freshly harvested organic potatoes. Perfect for restaurants and retail.",
      inStock: true,
      tags: ["organic", "potatoes", "fresh"],
    },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const applyFilters = (products: Product[], type: "buy" | "sell") => {
    return products
      .filter((product) => product.type === type)
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
      .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
      .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category))
      .filter((product) => selectedRating === null || product.rating >= selectedRating)
  }

  const handleAddToCart = (productId: number) => {
    setCartItems([...cartItems, productId])

    const product = products.find((p) => p.id === productId)
    if (product) {
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  const resetFilters = () => {
    setPriceRange([0, 15000])
    setSelectedCategories([])
    setSelectedRating(null)
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-500">Loading marketplace...</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={15000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {["fertilizer", "seed", "pesticide", "equipment", "crop"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-500">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={resetFilters} className="flex-1">
          Reset
        </Button>
        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setShowFilters(false)}>
          Apply
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold">{translate("marketplace")}</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart ({cartItems.length})</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={translate("searchProducts")}
              className="pl-10"
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

          <div className="hidden md:block">
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {(selectedCategories.length > 0 ||
                    selectedRating !== null ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 15000) && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600">
                      {selectedCategories.length +
                        (selectedRating !== null ? 1 : 0) +
                        (priceRange[0] > 0 || priceRange[1] < 15000 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="md:hidden">
            <Button variant="outline" className="w-full gap-2" onClick={() => setShowFilters(true)}>
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {(selectedCategories.length > 0 ||
                selectedRating !== null ||
                priceRange[0] > 0 ||
                priceRange[1] < 15000) && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600">
                  {selectedCategories.length +
                    (selectedRating !== null ? 1 : 0) +
                    (priceRange[0] > 0 || priceRange[1] < 15000 ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Tabs defaultValue="buy">
          <TabsList className="mb-6">
            <TabsTrigger value="buy">{translate("buyProducts")}</TabsTrigger>
            <TabsTrigger value="sell">{translate("sellProducts")}</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applyFilters(products, "buy").length > 0 ? (
                applyFilters(products, "buy").map((product) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-1">
                        <Badge
                          className={`
                          ${
                            product.category === "fertilizer"
                              ? "bg-green-100 text-green-800"
                              : product.category === "seed"
                                ? "bg-yellow-100 text-yellow-800"
                                : product.category === "pesticide"
                                  ? "bg-red-100 text-red-800"
                                  : product.category === "equipment"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                          }
                        `}
                        >
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                        <div className="flex ml-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-base mb-1 line-clamp-2">{product.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-bold">
                          {product.discount ? (
                            <div className="flex items-center gap-1">
                              {formatPrice(product.price * (1 - product.discount / 100))}
                              <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                            </div>
                          ) : (
                            formatPrice(product.price)
                          )}
                        </div>
                        <div className="text-sm text-gray-500">Seller: {product.seller}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags?.map((tag) => (
                          <div
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? translate("addToCart") : "Notify Me"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sell">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applyFilters(products, "sell").length > 0 ? (
                applyFilters(products, "sell").map((product) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-1">
                        <Badge className="bg-purple-100 text-purple-800">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                        <div className="flex ml-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-base mb-1 line-clamp-2">{product.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-bold">
                          {product.discount ? (
                            <div className="flex items-center gap-1">
                              {formatPrice(product.price * (1 - product.discount / 100))}
                              <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                            </div>
                          ) : (
                            formatPrice(product.price)
                          )}
                        </div>
                        <div className="text-sm text-gray-500">Seller: {product.seller}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags?.map((tag) => (
                          <div
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Contact Seller</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </div>
  )
}
