import type { Metadata } from "next";
import { headers } from 'next/headers'
import ContextProvider from './providers'

export const metadata: Metadata = {
  title: "AppKit in Next.js + wagmi",
  description: "AppKit example dApp",
};

export default async function ReownLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get('cookie');

  return (
    <ContextProvider cookies={cookies}>{children}</ContextProvider>
  );
}