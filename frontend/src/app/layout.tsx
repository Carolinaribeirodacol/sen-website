import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/common/Navbar'
import { getStrapiAPIURL } from '@/helpers/api'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sen Website',
  description: 'Site criado para um escritor',
}

async function getNavbarData() {
  try {
      const response = await fetch(
          getStrapiAPIURL('navbar?populate=*'), 
          { cache: 'no-store' }
      );

      return response.json();
  } catch (error) {
      console.log(error);
      throw new Error('Fail');
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: navbar } = await getNavbarData();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar items={navbar} />
        {children}
      </body>
    </html>
  )
}
