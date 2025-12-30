'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// 导航链接组件 - 在客户端组件中
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {children}
    </Link>
  );
}

export default function ReownLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 侧边导航栏 - 固定定位在左侧，从顶部导航栏下方开始 */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 text-white p-6 overflow-y-auto z-40">
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink href="/reown/wallet">Wallet</NavLink>
            </li>
            <li>
              <NavLink href="/reown/contract">Contract</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* 主内容区域 - 从导航栏右侧开始，占满剩余空间，可垂直滚动 */}
      <main className="ml-64 h-screen overflow-y-auto bg-gray-50 p-8 pt-20">
        {children}
      </main>
    </>
  );
}
