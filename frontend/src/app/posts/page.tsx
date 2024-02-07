import { Image } from "@/components/Image";
import { RevealAnimation } from "@/components/RevealAnimation";
import { getPostData } from "@/lib/load-posts";
import moment from "moment";
import NextImage from "next/image";
import Link from "next/link";

export default async function Post() {
    const { data: posts } = await getPostData();

    if (!posts) return <h1>Nenhum texto encontrado</h1>

    return (
        <main className='flex justify-center min-h-screen bg-slate-200 p-10'>
            <div className="container max-w-4xl py-6 lg:py-10 bg-white rounded-md">
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <RevealAnimation>
                        <div className="grid gap-10 sm:grid-cols-2">
                            {posts.map((post: any, index: number) => (
                                <article
                                    key={post.attributes && post.attributes.id}
                                    className="group relative flex flex-col space-y-2"
                                >
                                    {post.attributes.image.data ? (
                                        <Image
                                            image={post.attributes.image}
                                            alt={post.attributes.title}
                                            className="rounded-md border bg-muted transition-colors object-cover h-48 w-96"
                                            priority={index <= 1}
                                        />
                                    ) : (
                                        <NextImage
                                            src="/assets/sen-logo.png"
                                            alt={post.attributes.title}
                                            width={96}
                                            height={48}
                                            className="rounded-md border bg-muted transition-colors object-cover h-48 w-96 grayscale"
                                            priority={index <= 1}
                                        />
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
                    </RevealAnimation>
                </div>
            </div>
        </main>
    );
}