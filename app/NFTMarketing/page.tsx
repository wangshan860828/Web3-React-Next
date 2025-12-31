import { redirect } from 'next/navigation';

// 重定向到market-place页面，实现点击NFTMarketing导航时默认显示market-place内容
export default function NFTMarketingDefaultPage() {
  redirect('/NFTMarketing/market-place');
}
