import { cookies } from 'next/headers'
import ContextProvider from '@/reown-context'
import SideNavLayoutClient, { NavItem } from '@/components/layout/SideNavLayoutClient'

export const metadata = {
  title: 'NFT Marketing',
  description: 'NFT Marketing Platform',
}

export default async function NFTMarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const wagmiCookie = cookieStore.get('wagmi_state')?.value || null

  // 定义 NFTMarketing 模块的导航项
  const navItems: NavItem[] = [
    { href: '/NFTMarketing/market-place', label: 'Marketplace' },
    { href: '/NFTMarketing/list-my-nft', label: 'List My NFT' },
    { href: '/NFTMarketing/profile', label: 'Profile' },
  ]

  return (
    <ContextProvider cookies={wagmiCookie}>
      <SideNavLayoutClient navItems={navItems}>
        {children}
      </SideNavLayoutClient>
    </ContextProvider>
  )
}
