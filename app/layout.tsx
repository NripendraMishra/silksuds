import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext';
import AnalyticsTracker from '../components/AnalyticsTracker';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SilkSuds - Premium Ayurvedic Soaps',
  description: 'Experience the purity of nature with our handcrafted ayurvedic soaps. Premium quality soaps with natural ingredients for healthy, glowing skin.',
  keywords: 'ayurvedic soap, natural soap, aloe vera soap, neem soap, turmeric soap, handmade soap, organic soap, silksuds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <AnalyticsTracker />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
