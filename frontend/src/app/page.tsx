import { Image } from "@/components/Image";
import { getStrapiAPIURL } from "@/helpers/api";

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

export default async function Home() {
  const { data: homePageData } = await getHomeData();

  return (
    <main className="scroll-smooth">
      <div className="scroll-smooth focus:scroll-auto text-white align-middle items-center content-center py-60 flex flex-col justify-center bg-gradient-to-r from-sky-700 via-rose-900 to-yellow-600 w-full h-1/2">
        <Image className="flex-shrink-0 w-20 h-20" image={homePageData.attributes.logo} alt={homePageData.attributes.logo.data.id} />
        <h1 className="text-center font-medium text-4xl pt-6">
          {homePageData.attributes.phrase}
        </h1>
        <span className="text-center text-xl">
          {homePageData.attributes.author}
        </span>
      </div>

      <p className="text-lg mx-40 py-20">
        {homePageData.attributes.content}
      </p>
    </main>
  )
}