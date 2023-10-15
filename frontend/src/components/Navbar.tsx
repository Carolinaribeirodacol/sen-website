'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { SearchBar } from "./SearchBar";
import { Image } from "./Image";
import { UserAccountNav } from './UserAccountNav';
import { useState } from "react";
import { Icon } from "./Icon";
import { MobileNavbar } from "./MobileNavbar";

type Props = {
  items: {
    id: number;
    attributes: {
      logo: {
        data: {
          id: number;
          attributes: {
            url: string | StaticImport;
          }
        }
      },
      label: Array<{
        id: number;
        title: string;
        url: string;
      }>
    }
  }
}

export const Navbar = ({ items }: Props) => {
  const { data: session } = useSession()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <nav className="bg-white border-b-4 border-b-purple-900 top-0 left-0 right-0">
      <div className="max-w-7x1 mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          <div className="flex items-center">
            <Link href='/'>
              <Image
                alt="post-image"
                image={items.attributes.logo}
                className="flex-shrink-0 w-14 h-14 mr-4"
              />
            </Link>
            <span className="text-purple-900 font-medium text-lg">
              Sēn
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex flex-row gap-8 items-center content-center">
              <SearchBar />
              <a href="/posts" className="text-md text-purple-900 hover:border-b-purple-900">Textos</a>
              {session?.user ? (
                <>
                  <UserAccountNav user={session.user} />
                </>
              ) : (
                <Link href="/signin">
                  <Button typeButton="common" textButton="Entrar" />
                </Link>
              )}
            </div>
          </div>

          <button
            className="flex items-center md:hidden hover:bg-gray-100 focus:bg-gray-100 p-2 rounded-md"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Icon name="mdiMenu" className="text-purple-900" />
          </button>

          {showMobileMenu === true && (
            <MobileNavbar></MobileNavbar>
          )}
        </div>
      </div >
    </nav >

  );
}