import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CacheRegistry from '@/components/CacheRegistry/CacheRegistry';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'A list of tasks that need to be completed, typically organized in order of priority.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheRegistry>
          {children}
        </CacheRegistry>
      </body>
    </html>
  )
}
