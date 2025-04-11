"use client"

import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MarketplaceCard() {
  const marketItems = [
    { name: "Organic Fertilizer", price: "₹1,200", type: "fertilizer" },
    { name: "Wheat Seeds (5kg)", price: "₹850", type: "seed" },
    { name: "Pesticide Spray", price: "₹650", type: "pesticide" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Marketplace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500 capitalize">{item.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium">{item.price}</div>
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/marketplace" className="w-full">
          <Button variant="outline" className="w-full justify-between">
            <span>Visit Marketplace</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
