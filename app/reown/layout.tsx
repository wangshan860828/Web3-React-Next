// Server Component section - all server-related code
import { cookies } from 'next/headers'
import SideNavLayoutClient, { NavItem } from '@/components/layout/SideNavLayoutClient'

export const metadata = {
  title: "AppKit in Next.js + wagmi",
  description: "Reown AppKit with wagmi integration demo",
}

export default async function ReownLayout({ children }: { children: React.ReactNode }) {
  // 服务器端获取cookies - Next.js 16中cookies()返回Promise，需要await
  const cookieStore = await cookies()
  
  // 获取特定的wagmi相关cookie，通常以"wagmi_"为前缀
  const wagmiCookie = cookieStore.get('wagmi_state')?.value || null
  
  console.log('Wagmi Cookie (server-side):', wagmiCookie)

  // 定义 Reown 模块的导航项
  const navItems: NavItem[] = [
    { href: '/reown/wallet', label: 'Wallet' },
    { href: '/reown/contract', label: 'Contract' },
  ]

  return (
    <SideNavLayoutClient navItems={navItems}>
      {children}
    </SideNavLayoutClient>
  )
}