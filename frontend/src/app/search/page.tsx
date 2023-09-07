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

    // Função assíncrona que chama a função fetchPostsByTag
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const searchPosts = async () => {
    //     if (query) {
    //         await fetchPostsByTag(query);
    //     }
    // };

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
        <main className="flex min-h-screen bg-slate-300 p-10">
            <div className="grid grid-cols-4 gap-8 h-full">
                {posts.map((post: any) => {
                    return (
                        <div className="flex flex-col text-gray-800 bg-white/60 shadow-lg hover:opacity-80 h-96 overflow-hidden" key={post.attributes.id}>
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