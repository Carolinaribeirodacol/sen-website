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
        <div className="container max-w-4xl py-6 lg:py-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                {/* {posts.map((post: any) => {
                    return (
                        <div
                            className="flex flex-col text-gray-800 bg-white/60 shadow-lg hover:opacity-80 w-auto"
                            key={post.attributes.id}>
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
                                    <h1
                                        className="font-bold py-2 text-2xl text-purple-900"
                                    >
                                        {post.attributes.title}
                                    </h1>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Markdown
                                            className="text-sm overflow-hidden w-48"
                                        >
                                            {post.attributes.content}
                                        </Markdown>
                                        <span>...</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })} */}
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
    );
}