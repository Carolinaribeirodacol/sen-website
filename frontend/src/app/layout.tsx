import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { Navbar } from '@/components/Navbar'
import { getStrapiAPIURL } from '@/helpers/api'
import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/Footer'

// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Sen Literatura',
  description: 'Textos literários',
}

export async function getNavbarData() {
  try {
    const response = await fetch(
      getStrapiAPIURL('navbar?populate=*'),
      { cache: 'no-store' }
    );

    return response.json();
  } catch (error) {
    throw new Error('Fail');
  }
}

export default async function RootLayout({
  children,
}: {
  session: any
  children: React.ReactNode,
  navbar: any
}) {
  const { data: navbar } = await getNavbarData();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Navbar items={navbar} />
          {children}
          <Toaster />
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}