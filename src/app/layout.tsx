import ProgressProviders from '@/components/ProgressProviders'
import { leagueSpartan } from '@/fonts/fonts'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Muakey',
  description: 'Muakey Base',
}

export const fetchCache = 'force-cache'

const ToastHolder = dynamic(() => import('@/ui').then((ui) => ui.ToastHolder))

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={leagueSpartan.variable} suppressHydrationWarning>
      {process.env.GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID} />
      )}
      <body className={`${leagueSpartan.variable}`}>
        <ProgressProviders>{children}</ProgressProviders>
        <ToastHolder />
      </body>
    </html>
  )
}
