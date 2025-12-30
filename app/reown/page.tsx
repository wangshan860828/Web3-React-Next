import { redirect } from 'next/navigation';

// 重定向到wallet页面，实现点击reown导航时默认显示wallet内容
export default function ReownDefaultPage() {
  redirect('/reown/wallet');
}
