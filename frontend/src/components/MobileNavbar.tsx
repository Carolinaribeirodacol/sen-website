import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { SearchBar } from "./SearchBar"
import { Button } from "./Button"
import { signOut, useSession } from "next-auth/react"
import { mdiExitToApp } from "@mdi/js"
import Icon from "@mdi/react"

export const MobileNavbar = () => {
    const { data: session } = useSession()

    return (
        <div
            className={cn(
                "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
            )}
        >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
                {session?.user ? (
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            {session.user.name && <p className="font-medium">{session.user.name}</p>}
                            {session.user.email && (
                                <p className="w-[200px] truncate text-sm text-muted-foreground">
                                    {session.user.email}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <h2 className="font-semibold">Menu</h2>
                )}
                <nav className="grid grid-flow-row auto-rows-max text-md space-y-2">
                    {session?.user ? (
                        <>
                            <Link className="hover:bg-gray-100 rounded-sm p-2" href="/edit-account">Editar cadastro</Link>

                            {/* <Button onClick={() => signOut()} textButton="Sair"></Button> */}
                            <button onClick={() => signOut()} className="flex flex-row cursor-pointer hover:bg-gray-100 rounded-sm p-2">
                                <span className="mr-2">Sair</span>
                                <Icon size={1} path={mdiExitToApp} />
                            </button>
                        </>
                    ) : (
                        <Link href="/signin" className="hover:bg-gray-100 rounded-sm p-2">
                            Entrar
                        </Link>
                    )}
                    <SearchBar />
                </nav>
            </div>
        </div>
    )
}