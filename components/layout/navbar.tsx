"use client"
import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const pathname = usePathname()

  // 检查当前路径是否与给定路径匹配
  const isActive = (path: string) => {
    // 如果是根路径，直接匹配
    if (path === "/" && pathname === "/") return true
    // 否则检查路径是否以给定路径开头
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full" viewport={false}>
          <NavigationMenuList className="flex-wrap justify-center py-3">
            {/* About Menu Item */}
            <NavigationMenuItem>
              <Link 
                href="/about" 
                className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium text-decoration-none transition-all duration-300 ${isActive("/about") ? 'bg-gray-300 text-blue-600' : 'text-gray-900 hover:bg-gray-300 hover:text-blue-600 active:text-blue-600'}`}
              >
                About
              </Link>
            </NavigationMenuItem>

            {/* Test Menu Item */}
            <NavigationMenuItem>
              <Link 
                href="/test" 
                className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium text-decoration-none transition-all duration-300 ${isActive("/test") ? 'bg-gray-300 text-blue-600' : 'text-gray-900 hover:bg-gray-300 hover:text-blue-600 active:text-blue-600'}`}
              >
                Test
              </Link>
            </NavigationMenuItem>

            {/* Reown Menu Item */}
            <NavigationMenuItem>
              <Link 
                href="/reown" 
                className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium text-decoration-none transition-all duration-300 ${isActive("/reown") ? 'bg-gray-300 text-blue-600' : 'text-gray-900 hover:bg-gray-300 hover:text-blue-600 active:text-blue-600'}`}
              >
                Reown
              </Link>
            </NavigationMenuItem>

            {/* Wagmi Menu Item with Submenu */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive("/wagmi") ? 'bg-gray-300 text-blue-600' : 'text-gray-900 hover:bg-gray-300 hover:text-blue-600 active:text-blue-600'}`}>
                Wagmi
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-40"
              >
                <ul className="grid gap-1">
                  <li>
                    <Link
                      href="/wagmi/wallet"
                      className={`flex w-full items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-decoration-none transition-all duration-200 ${isActive("/wagmi/wallet") ? 'bg-gray-300 text-blue-600' : 'text-gray-900 hover:bg-gray-300 hover:text-blue-600 active:text-blue-600'}`}
                    >
                      Wallet
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}