import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Image } from "../ui/Image";
import SearchBar from "./SearchBar";

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
  const tags = ['teste'];

  return (
    <nav className="bg-white border-b-4 border-b-purple-900 h-36">
    <div className="flex flex-wrap items-center justify-between m-auto h-full py-4 px-6 ">
        <div className="flex items-center">
            <Image
              alt="post-image"
              image={items.attributes.logo}
              className="w-14 h-14 mr-4"
            />
            <span className="violet-600 text-lg">Sēn</span>
        </div>
        <div className="hidden w-full md:block md:w-auto text-lg" id="navbar-default">
          <ul className="font-medium flex flex-row items-center p-4 md:p-0 mt-4 rounded-lg md:space-x-8 md:mt-0">
              <li>
                {items.attributes.label.map(label => (
                  <a key={label.id} href={label.url} className="text-gray-900 font-normal hover:text-violet-600 rounded md:hover:text-fuchsia-40\0 pl-4">{label.title}</a>
                ))}
              </li>
              <li>
                <SearchBar items={tags} />
              </li>
          </ul>
        </div>
    </div>
    </nav>
  );
}