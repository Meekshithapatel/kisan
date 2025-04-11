"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Cloud,
  CreditCard,
  Home,
  Leaf,
  Settings,
  ShoppingCart,
  Tractor,
  User,
  Users,
  Cpu,
  LogOut,
  X,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const { translate } = useLanguage()
  const { isOpen, setIsOpen } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile, setIsOpen])

  const menuItems = [
    {
      title: translate("dashboard"),
      icon: Home,
      href: "/dashboard",
    },
    {
      title: translate("weather"),
      icon: Cloud,
      href: "/dashboard/weather",
    },
    {
      title: translate("soil"),
      icon: BarChart3,
      href: "/dashboard/soil-analysis",
    },
    {
      title: translate("crops"),
      icon: Leaf,
      href: "/dashboard/crop-management",
    },
    {
      title: translate("irrigation"),
      icon: Tractor,
      href: "/dashboard/irrigation",
    },
    {
      title: translate("sensors"),
      icon: Cpu,
      href: "/dashboard/sensors",
    },
    {
      title: translate("marketplace"),
      icon: ShoppingCart,
      href: "/dashboard/marketplace",
    },
    {
      title: translate("payments"),
      icon: CreditCard,
      href: "/dashboard/payments",
    },
    {
      title: translate("users"),
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: translate("profile"),
      icon: User,
      href: "/dashboard/profile",
    },
    {
      title: translate("settings"),
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  return (
    <Sidebar className="max-h-screen overflow-y-auto">
      <SidebarHeader className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            HK
          </div>
          <div className="font-bold text-lg">Hey Kisan</div>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto py-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="py-3 md:py-2"
              >
                <Link href={item.href} className="flex items-center gap-3 px-3">
                  <item.icon className="h-5 w-5" />
                  <span className="text-base md:text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t mt-auto">
        <div className="flex flex-col gap-4">
          <LanguageSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2 gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xs">RK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">Ishvik</span>
                  <span className="text-xs text-muted-foreground">Farmer</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{translate("myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>{translate("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{translate("settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login" className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{translate("logout")}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-xs text-gray-500 text-center">
            <p>Hey Kisan v1.0</p>
            <p>© 2025 All rights reserved</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
    </Sidebar>
  )
}
