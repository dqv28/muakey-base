import { leagueSpartan } from '@/fonts/fonts'
import { ToastHolder } from '@/ui'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Muakey',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={leagueSpartan.variable}>
      <body className={`${leagueSpartan.variable}`}>
        {children}
        <ToastHolder />
      </body>
    </html>
  )
}
