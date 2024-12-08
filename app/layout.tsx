// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import WalletContext from '../contexts/WalletContext'

export const metadata = {
  title: 'NUEIO Token Pre-Sale',
  description: 'Pre-sale website for NUEIO token',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <WalletContext>
          <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
            <WalletMultiButton />
          </header>
          {children}
        </WalletContext>
      </body>
    </html>
  )
}