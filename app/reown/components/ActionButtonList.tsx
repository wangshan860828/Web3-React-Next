'use client'
import { useDisconnect, useAppKit, useAppKitNetwork  } from '@reown/appkit/react'
import { networks } from '@/config'
import { Button } from "@/components/ui/button"

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    }
  return (
    <div>
        <Button className="mr-2" onClick={() => open()}>Open</Button>
        <Button className="mr-2" onClick={handleDisconnect}>Disconnect</Button>
        <Button className="mr-2" onClick={() => switchNetwork(networks[1]) }>Switch</Button>
    </div>
  )
}