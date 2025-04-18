'use client'

import { FC, PropsWithChildren } from 'react'
import { env } from '@/env.mjs'
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'

import { siteConfig } from '@/lib/siteConfig'
import { ThemeProvider } from 'next-themes'

const config = getDefaultConfig({
  appName: siteConfig.title,
  projectId: env.NEXT_PUBLIC_WC_ID,
  chains: [{
    ...mainnet,
    rpcUrls: {
        default: {
            http: ['https://rpc.ankr.com/eth/'],
        }
    }
  }],
  ssr: false, // If your dApp uses server side rendering (SSR)
})

export const RootProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            ...lightTheme.accentColors.orange,
            fontStack: 'system',
            overlayBlur: 'small',
            borderRadius: 'small',
          })}
        >
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
          </ThemeProvider>
          <Toaster theme={'light'} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
