'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import Image from "next/image";
import { SearchBar } from "./SearchBar";

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
    <nav className="bg-white border-b-4 border-b-purple-900 h-36">
      <div className="flex flex-wrap items-center content-center justify-between m-auto h-full py-4 px-6">
        <div className="flex items-center">
          {/* <pre className="bg-black text-white">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre> */}
          {/* <Image
            alt="post-image"
            image={items.attributes.logo}
            className="w-14 h-14 mr-4"
          /> */}
          <span className="text-violet-600 text-lg">Sēn</span>
        </div>
        <div className="hidden w-full md:block md:w-auto text-lg" id="navbar-default">
          <ul className="font-medium flex flex-row items-center content-center gap-6">
            <li>
              <SearchBar />
            </li>
            {session?.user ? (
              <>
                <li className="text-gray-800 text-sm">{session.user.name}</li>
                <li>
                  <button className="text-white bg-purple-900 hover:bg-purple-950 focus:ring-2 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2"
                    onClick={() => signOut()}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin">
                    <Button typeButton="common" textButton="Entrar" />
                  </Link>
                </li>
                {/* <li>
                  <Link href="/signup">
                    <Button typeButton="common" textButton="Cadastrar" />
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}