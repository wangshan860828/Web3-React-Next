import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Providers } from "./providers";
import { getConfig } from "./config";

export default async function WagmiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 只在 wagmi 路由下初始化 wagmi 状态
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <Providers initialState={initialState}>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Wagmi Dashboard</h1>
          <p className="text-gray-600">Web3 功能演示区域</p>
        </header>
        {children}
      </div>
    </Providers>
  );
}