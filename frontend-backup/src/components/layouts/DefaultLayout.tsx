'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Navbar } from "../common/Navbar"
import { UserProvider, useFetchUser } from "@/lib/authContext"

type Props = {
  children: ReactNode
  navbar: any
}

export const DefaultLayout = ({ navbar, children }: Props) => {
  const { user, loading } = useFetchUser();

  return (
    <SessionProvider>
      {/* @ts-ignore */}
      <UserProvider value={{ user, loading }}>
        <Navbar items={navbar} />
        {children}
      </UserProvider>
    </SessionProvider>
  )
}