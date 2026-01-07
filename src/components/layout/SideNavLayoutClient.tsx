'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// 导航项类型定义
export interface NavItem {
  href: string;
  label: string;
}

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

// 通用侧边导航布局组件
export default function SideNavLayoutClient({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
}) {
  return (
    <div className="flex min-h-screen w-full pt-[60px]">
      {/* 侧边导航栏 */}
      <aside className="w-64 bg-gray-800 text-white p-6 overflow-y-auto shrink-0 h-[calc(100vh-60px)] sticky top-[60px]">
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* 主内容区域 */}
      <main className="flex-1 bg-white overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
