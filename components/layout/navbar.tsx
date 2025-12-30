"use client"
import * as React from "react"
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full" viewport={false}>
          <NavigationMenuList className="flex-wrap justify-center py-3">
            {/* About Menu Item */}
            <NavigationMenuItem>
              <Link 
                href="/about" 
                className={`${navigationMenuTriggerStyle()} px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-blue-600 text-decoration-none`}
              >
                About
              </Link>
            </NavigationMenuItem>

            {/* Test Menu Item */}
            <NavigationMenuItem>
              <Link 
                href="/test" 
                className={`${navigationMenuTriggerStyle()} px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-blue-600 text-decoration-none`}
              >
                Test
              </Link>
            </NavigationMenuItem>

            {/* Wagmi Menu Item with Submenu */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-blue-600">
                Wagmi
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-40"
              >
                <ul className="grid gap-1">
                  <li>
                    <Link
                      href="/wagmi/wallet"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-decoration-none"
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