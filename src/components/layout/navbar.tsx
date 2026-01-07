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
import { ConnectButton } from "@/components/ConnectButton";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 px-[30px] h-[60px]">
      <div className="flex justify-between items-center h-full">
        <NavigationMenu viewport={false} className="flex-0">
          <NavigationMenuList className="justify-start gap-10">
            <NavigationMenuItem>
              <Link 
                href="/NFTMarketPlace" 
                className={`text-white! font-bold! text-[18px]! rounded-lg px-3 py-2 transition-all ${isActive("/NFTMarketPlace") ? 'bg-white/30 px-[10px]! py-[5px]!' : ''}`}
              >
                NFTMarketPlace
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link 
                href="/about" 
                className={`text-white! font-bold! text-[18px]! rounded-lg px-3 py-2 transition-all ${isActive("/about") ? 'bg-white/30 px-[10px]! py-[5px]!' : ''}`}
              >
                about
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ConnectButton />
      </div>
    </header>
  )
}