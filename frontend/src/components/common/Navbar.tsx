'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Image } from "../ui/Image";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export const Navbar = ({items}: Props) => {
  return (
    <nav className="bg-white border-b-4 border-b-purple-900 h-36">
    <div className="flex flex-wrap items-center content-center justify-between m-auto h-full py-4 px-6">
        <div className="flex items-center">
            <Image
              alt="post-image"
              image={items.attributes.logo}
              className="w-14 h-14 mr-4"
            />
            <span className="violet-600 text-lg">Sēn</span>
        </div>
        <div className="hidden w-full md:block md:w-auto text-lg" id="navbar-default">
          <ul className="font-medium flex flex-row items-center content-center gap-6">
            <li>
              <SearchBar />
            </li>
            <li>
              <Link href='\login'>
                <Button typeButton="common" textButton="Entrar"/>
              </Link>
            </li>
            {/* {items.attributes.label.map(label => (
              <li key={label.id}>
                {label.title === 'Cadastrar' || label.title === 'Entrar' ? (
                  <Button typeButton="google" />
                  
                ) : (
                  <a
                    key={label.id}
                    href={label.url}
                    className="text-gray-900 font-normal hover:text-violet-600 rounded md:hover:text-fuchsia-40\0 pl-4"
                  >
                    {label.title}
                  </a>
                )}
              </li>
            ))} */}
          </ul>
        </div>
    </div>
    </nav>
  );
}