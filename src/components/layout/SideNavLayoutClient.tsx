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
  label,
}: {
  href: string;
  label: string;
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
      {label}
    </Link>
  );
}

// 通用侧边导航布局组件
export default function SideNavLayoutClient({
  navItems,
}: {
  navItems: NavItem[];
}) {
  return (
    <div>
      {/* 侧边导航栏 */}
      <aside className="fixed top-[60px] left-0 w-64 h-[calc(100vh-60px)] bg-gray-800 text-white">
        <nav>
          <ul className="space-y-4"> 
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
