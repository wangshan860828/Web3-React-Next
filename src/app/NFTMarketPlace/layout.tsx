import SideNavLayoutClient from '@/components/layout/SideNavLayoutClient'

export default function NFTMarketPlaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { href: '/NFTMarketPlace', label: 'NFTMarketPlace' },
    { href: '/NFTMarketPlace/listMyNFT', label: 'listMyNFT' },
    { href: '/NFTMarketPlace/profile', label: 'profile' },
  ]

  return <SideNavLayoutClient navItems={navItems}>{children}</SideNavLayoutClient>
}
