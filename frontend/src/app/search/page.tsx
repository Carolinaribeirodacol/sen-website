"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPostByTag } from '../api/getPostByTag'
import NextImage from "next/image";
import { Image } from "@/components/Image";
import moment from 'moment';
import Link from "next/link";

export default function Search() {
    const searchParams = useSearchParams()

    const query = searchParams?.get('query')
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        if (query) {
            fetchPostsByTag(query);
        }
    }, [query]);

    const fetchPostsByTag = async (tag: any) => {
        try {
            const posts = await getPostByTag(tag);
            setPosts(posts.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <main className='flex justify-center min-h-screen bg-slate-200 p-10'>
            <div className="container max-w-4xl py-6 lg:py-10 bg-white rounded-md">
                {posts.length > 0 ?
                    (
                        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
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
                        </div>
                    ) : (
                        <h1 className="text-purple-900 font-bold text-xl text-center">Nenhum texto encontrado</h1>
                    )
                }
            </div>
        </main>
    );
}