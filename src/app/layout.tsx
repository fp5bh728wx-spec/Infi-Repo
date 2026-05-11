/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Infinite Wellness', template: '%s | Infinite Wellness' },
  description: 'Your AI-powered health, fitness & wellness companion. Personalized workout plans, nutrition tracking, and 24/7 AI coaching — completely free.',
  keywords: ['fitness', 'wellness', 'AI coach', 'nutrition tracker', 'workout planner', 'health app'],
  authors: [{ name: 'Infinite Wellness' }],
  openGraph: {
    title: 'Infinite Wellness — AI Health & Fitness Coach',
    description: 'Your AI-powered health, fitness & wellness companion.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1a2e1a',
              border: '1px solid #e6f0e6',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 20px rgba(61,90,62,0.12)',
            },
            success: { iconTheme: { primary: '#558c55', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
