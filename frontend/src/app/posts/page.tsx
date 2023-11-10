import { Image } from "@/components/Image";
import { getStrapiAPIURL } from "@/helpers/api";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function getPostData() {
    try {
        const response = await fetch(
            getStrapiAPIURL('posts?populate=*'),
            { cache: 'no-store' }
        );

        return await response.json();
    } catch (error) {
        throw new Error('Fail');
    }
}

export default async function Post() {
    const { data: posts } = await getPostData();
    const router = useRouter()

    if (!posts) return <h1>Nenhum texto encontrado</h1>

    return (
        <main className='flex justify-center min-h-screen bg-slate-200 p-10'>
            <div className="container max-w-4xl py-6 lg:py-10 bg-white rounded-md">
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div className="grid gap-10 sm:grid-cols-2">
                        {posts.map((post: any, index: number) => (
                            <article
                                key={post.attributes && post.attributes.id}
                                className="group relative flex flex-col space-y-2"
                            >
                                {post.attributes && post.attributes.image && (
                                    <div>
                                        <Image
                                            image={post.attributes.image}
                                            alt={post.attributes.title}
                                            className="rounded-md border bg-muted transition-colors object-cover h-48 w-96"
                                            priority={index <= 1}
                                        />
                                    </div>
                                )}
                                <h2 className="text-purple-900 font-bold text-xl">{post.attributes.title}</h2>
                                <p className="text-sm text-muted-foreground space-x-2">
                                    <span>{moment(post.attributes.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                                    <span className="text-sm">de {post.attributes.author}</span>
                                </p>
                                {post.attributes.content && (
                                    <p className="text-sm text-muted-foreground">
                                        {post.attributes.abstract}
                                    </p>
                                )}
                                <Link href={`posts/${post.id}`} className="absolute inset-0">
                                    <span className="sr-only">Ver post</span>
                                </Link>
                            </article>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}