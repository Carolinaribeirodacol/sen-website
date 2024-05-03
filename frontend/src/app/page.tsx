import { Image } from "@/components/Image";
import { RevealAnimation } from "@/components/RevealAnimation";
import SimpleSlider from "@/components/SimpleSlider";
import { getStrapiAPIURL } from "@/helpers/api";
import Link from "next/link";

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

  let phrases = homePageData.attributes.phrases;

  if (!homePageData) {
    return <h1>Nenhum dado encontrado</h1>
  }

  return (
    <main className="scroll-smooth bg-gray-50">
      <div className="w-3/4 mx-auto">
        <SimpleSlider className="text-white bg-gradient-to-r from-sky-700 via-rose-900 to-yellow-600 rounded-bl-3xl rounded-br-3xl px-10">
          {phrases.map((phrase: any) => (
            <div key={phrase.id}>
              <div className="flex flex-col p-10 items-center">
                <h1 className="md:text-sm font-medium text-2xl pt-6">
                  {phrase.content}
                </h1>
  
                <span className="md:text-sm text-xl">
                  {phrase.author}
                </span>
  
                {phrase.link ? (<Link className="w-auto text-sm text-purple-900 bg-white hover:bg-gray-300 px-2 rounded-full m-2" href={phrase.link}>Leia mais</Link>) : null}
              </div>
            </div>
          ))}
        </SimpleSlider>
      </div>
      
      <p className="md:text-sm text-lg mx-4 lg:mx-40 py-20 rounded-tl-3xl rounded-tr-3xl">
        <RevealAnimation>
          {homePageData.attributes.content}
        </RevealAnimation>
      </p>
    </main>
  )  
}