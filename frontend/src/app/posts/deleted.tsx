import { Image } from "@/components/Image";
import { Markdown } from "@/components/Markdown";
import { getStrapiAPIURL } from "@/helpers/api";
import moment from "moment";
import Link from "next/link";

type PostProps = {
  data: {
    posts: {
      id: number;
      post: {
        attributes: {
          image: ImageData,
          title: string,
          content: string,
          slug: string,
          author: string,
          tags: [],
          createdAt: Date,
          comment: []
        }
      }
    }
  }
}

interface ImageData {
  id: number;
  attributes: {
    url: string;
  };
}

async function getPostData(): Promise<PostProps> {
  try {
    const response = await fetch(
      getStrapiAPIURL('posts?populate=*'),
      { cache: 'no-store' }
    );

    return response.json();
  } catch (error) {
    throw new Error('Fail');
  }
}

export default async function Post() {
  const { data: posts }: any = await getPostData();

  return (
    <main className="flex min-h-screen bg-slate-200 p-10">
      <div className="grid grid-cols-4 gap-8 h-full">
        {posts.map((post: any) => {
          return (
            <div className="flex flex-col bg-white/60 shadow-lg hover:opacity-80 h-96 overflow-hidden" key={post.attributes.id}>
              <Link href={`posts/${post.id}`}>
                <div className="flex flex-grow-0">
                  <Image
                    alt="post-image"
                    image={post.attributes.image}
                    className="h-44 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <ul className="text-xs mb-2">
                    <li>
                      de {post.attributes.author}
                    </li>
                    <li>
                      publicado em: {moment(post.attributes.createdAt).format('DD/MM/YYYY HH:mm')}
                    </li>
                  </ul>
                  <h1 className="font-bold py-4 text-2xl text-purple-900">{post.attributes.title}</h1>
                  <Markdown className="text-sm">{post.attributes.content}</Markdown>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  );
}