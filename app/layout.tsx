import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'StudyKit — Free Tools for Students',
  description: 'Free rank predictors and calculators for Indian students',
  keywords: [
    'AP EAMCET rank predictor 2026',
    'TS EAMCET rank predictor 2026', 
    'TG EAPCET rank estimator',
    'AP EAPCET rank estimator free',
    'EAMCET rank from marks',
    'free rank predictor no login',
    'AP EAMCET marks vs rank 2026',
    'TS EAMCET marks vs rank 2026',
    'EAMCET college predictor',
    'NEET rank predictor India',
  ],
  openGraph: {
    title: 'StudyKit — Free EAMCET & NEET Rank Predictors',
    description: 'Free rank predictors for AP EAMCET, TS EAMCET and NEET. No login required. Based on official 2025 data.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
