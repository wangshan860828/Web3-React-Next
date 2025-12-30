import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage 
} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    // 添加钱包连接器
    connectors: [
      injected(),
    ],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}