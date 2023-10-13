"use client"

import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPostByTag } from '../api/getPostByTag'
import { Image } from '@/components/Image'
import { Markdown } from '@/components/Markdown'

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
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div className="grid gap-10 sm:grid-cols-2">
                        {posts.map((post: any, index: number) => (
                            <article
                                key={post.attributes.id}
                                className="group relative flex flex-col space-y-2"
                            >
                                {post.attributes.image && (
                                    <Image
                                        image={post.attributes.image}
                                        alt={post.title}
                                        width={804}
                                        height={452}
                                        className="rounded-md border bg-muted transition-colors"
                                        priority={index <= 1}
                                    />
                                )}
                                <h2 className="text-2xl font-extrabold">{post.title}</h2>
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