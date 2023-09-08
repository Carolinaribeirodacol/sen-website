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
        <main className="flex justify-center min-h-screen bg-slate-300 p-10">
            <div className="grid grid-cols-3 gap-8 h-1/2">
                {posts.map((post: any) => {
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
                })}
            </div>
        </main>
    );
}