import { Image } from "@/components/Image";
import { RevealAnimation } from "@/components/RevealAnimation";
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

const getRandomPhrase = (phrases: any) => {
  const randomIndex = Math.floor(Math.random() * phrases?.length);
  return phrases[randomIndex];
};

export default async function Home() {
  const { data: homePageData } = await getHomeData();
  let phrase = {
    id: 1,
    content: "Frase de teste",
    author: "Autor teste"
  }

  if (homePageData.attributes.phrases) {
    phrase = getRandomPhrase(homePageData.attributes.phrases);
  }


  if (!homePageData) {
    return <h1>Nenhum dado encontrado</h1>
  }

  return (
    <main className="scroll-smooth">
      <div className="scroll-smooth focus:scroll-auto text-white align-middle items-center content-center py-60 flex flex-col justify-center bg-gradient-to-r from-sky-700 via-rose-900 to-yellow-600 w-full h-1/2">
        <Image className="flex-shrink-0 w-20 h-20" image={homePageData.attributes.logo} alt={homePageData.attributes.logo.data.id} />
        <RevealAnimation>
        <div className="lg:max-w-3xl text-center">
            <h1 className="font-medium text-2xl pt-6 animate-out fade-out-25">
              {phrase.content}
            </h1>
            <span className="text-xl">
              {phrase.author}
            </span>
        </div>
        </RevealAnimation>
      </div>

      <p className="text-lg mx-40 py-20">
        <RevealAnimation>
          {homePageData.attributes.content}
        </RevealAnimation>
      </p>
    </main>
  )
}