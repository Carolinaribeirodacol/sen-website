import { RevealAnimation } from "@/components/RevealAnimation";
import { getStrapiAPIURL } from "@/helpers/api";
import CarouselComponent from "@/components/Carousel";
import { Image } from "@/components/Image";

async function getHomeData() {
  try {
    const response = await fetch(
      getStrapiAPIURL('home?populate=*'),
      { cache: 'no-store' }
    );

    JSON.stringify({ response });

    return response.json();
  } catch (error) {
    throw new Error('Fail');
  }
}

async function getCategories() {
  try {
    const response = await fetch(
      getStrapiAPIURL('phrase-categories?pagination%5Blimit%5D=-1&populate=*&filters%5Bphrases%5D%5Bid%5D%5B%24notNull%5D=true&sort=order%3Aasc'),
      { cache: 'no-store' }
    );

    return response.json();
  } catch (error) {
    throw new Error('Fail');
  }
}

// const getRandomPhrase = (phrases: any) => {
//   const randomIndex = Math.floor(Math.random() * phrases?.length);
//   return phrases[randomIndex];
// };

export default async function Home() {
  const { data: homePageData } = await getHomeData();
  const { data: categories } = await getCategories();

  if (!homePageData) {
    return <h1>Nenhum dado encontrado</h1>
  }

  if (!categories) {
    return <h1>Nenhum dado encontrado</h1>
  }

  return (
    <main className="scroll-smooth bg-gray-50">
      <div className="w-full px-10 py-6 bg-gradient-to-r from-sky-700 via-rose-900 to-yellow-600">
          <div className="flex flex-col">
            {homePageData.attributes.logo &&
              <Image
                image={homePageData.attributes.logo}
                alt="logo"
                className="h-20 w-20 mx-auto my-6"
              />
            }
            <CarouselComponent categories={categories} />
          </div>
      </div>

      <RevealAnimation>
        <div className="mx-4 lg:mx-40 py-10 rounded-tl-3xl rounded-tr-3xl">
          {/* {homePageData.attributes.logo &&
              <Image
                image={homePageData.attributes.logo}
                alt="logo"
                className="h-20 w-20 mx-auto mb-4"
              />
            } */}
          <p className="md:text-sm text-lg">
            {homePageData.attributes.content}
          </p>
        </div>
      </RevealAnimation>
    </main>
  )  
}