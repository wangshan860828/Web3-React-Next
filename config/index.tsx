import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from https://dashboard.reown.com
export const projectId = "6e9d0301823a1e3d1821a6f98fa2c875" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const ganacheChain = defineChain({
  id: 1337,
  name: 'Ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:7545'],
    },
    public: {
      http: ['http://127.0.0.1:7545'],
    },
  },
  blockExplorers: {
    default: { name: 'None', url: '#' },
  },
  testnet: true,
}) as AppKitNetwork

export const networks = [ganacheChain] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig