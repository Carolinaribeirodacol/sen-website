'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { SearchBar } from "./SearchBar";
import { Image } from "./Image";
import { UserAccountNav } from './UserAccountNav';

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

const editAccount = () => {

}

export const Navbar = ({ items }: Props) => {
  const { data: session } = useSession()

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
            <span className="text-violet-900 font-medium text-lg">
              Sēn
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex flex-row gap-8">
              <SearchBar />
              {session?.user ? (
                <>
                  {/* {JSON.stringify(session.user.id)} */}
                  <UserAccountNav user={session.user} />
                </>
              ) : (
                <Link href="/signin">
                  <Button typeButton="common" textButton="Entrar" />
                </Link>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button id="menuButton" type="button"
              className="text-purple-900 inline-flex items-center justify-center p-2 hover:bg-gray-100
                rounded-md hover:text-purple-950 focus:outline-none focus:bg-gray-100 transition duration-150 easy-in-out"
              aria-label="Menu"
              aria-expanded="false"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div >

      <div id="menu" className="hidden md:hidden bg-purple-900 text-white">
        <div className="px-2 pt-2 pd-3 sm:px-3">
          <SearchBar />
        </div>
      </div>
    </nav >

  );
}