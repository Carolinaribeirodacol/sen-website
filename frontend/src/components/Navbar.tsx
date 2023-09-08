'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { SearchBar } from "./SearchBar";
import { Image } from "./Image";

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

  return (
    <nav className="bg-white border-b-4 border-b-purple-900 h-36 top-0 left-0 right-0">
      <div className="flex items-center content-center justify-between m-auto h-full py-4 px-6">
        <div>
          {/* <pre className="bg-black text-white">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre> */}
          <Link className="flex items-center" href='/'>
            <Image
              alt="post-image"
              image={items.attributes.logo}
              className="w-14 h-14 mr-4"
            />
            <span className="text-violet-900 font-medium text-lg">
              Sēn
            </span>
          </Link>
        </div>
        <div className="flex flex-nowrap items-center w-auto text-lg gap-6" id="navbar-default">
          <SearchBar />
          {session?.user ? (
            <>
              <ul>
                <li className="text-gray-800 text-sm">{session.user.name}</li>
                <li>
                  <button
                    className="text-white bg-purple-900 hover:bg-purple-950 
                      focus:ring-2 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2"
                    onClick={() => signOut()}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link href="/signin">
                    <Button typeButton="common" textButton="Entrar" />
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}