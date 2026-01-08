import SideNavLayoutClient from '@/components/layout/SideNavLayoutClient';
import bgImage from '@/assert/images/bg.png';

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

  return (
    <div className="pl-64">
      <SideNavLayoutClient navItems={navItems} />
      <main 
        className="flex-1 h-[calc(100vh-60px)] overflow-y-auto"
        style={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {children}
      </main>
    </div>
  )
}
