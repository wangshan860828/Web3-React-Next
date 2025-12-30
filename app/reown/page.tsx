// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "./components/ConnectButton";
import { InfoList } from "./components/InfoList";
import { ActionButtonList } from "./components/ActionButtonList";

export default function Home() {

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">AppKit Wagmi Next.js App Router Example</h1>

      <ConnectButton />
      
      <div className="border-b border-gray-300 my-4"></div>
      
      <ActionButtonList />
      
      <div className="border-b border-gray-300 my-4"></div>
      
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
        </p>
      </div>
      
      <div className="border-b border-gray-300 my-4"></div>
      
      <InfoList />
    </div>
  );
}