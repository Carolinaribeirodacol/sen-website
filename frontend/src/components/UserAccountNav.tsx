"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/UserAvatar"
import { DefaultJWT } from 'next-auth/jwt'
import Icon from '@mdi/react';
import { mdiAccount, mdiExitToApp } from "@mdi/js"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<DefaultJWT, "name" | "picture" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || null, image: user.picture || null }}
            className="h-8 w-8"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="cursor-pointer"
          >
            <Link href="/edit-account">Editar cadastro</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => signOut()}
          >
            <span className="mr-2">Sair</span>
            <Icon size={1} path={mdiExitToApp} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}