"use client"

import { getPostByTag } from '@/api/getPostByTag'
import { Image } from '@/components/ui/Image'
import { Markdown } from '@/components/ui/Markdown'
import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CKEditor from 'ckeditor4-react';

export default function Search() {
    const searchParams = useSearchParams()

    const query = searchParams.get('query')
    const [posts, setPosts] = useState([]);

    const fetchPostsByTag = async (tag: any) => {
        try {
            const posts = await getPostByTag(tag);
            setPosts(posts.data);

            console.log(posts.data[0].attributes.slug)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Função assíncrona que chama a função fetchPostsByTag
    const searchPosts = async () => {
        if (query) {
            await fetchPostsByTag(query);
        }
    };

    useEffect(() => {
        searchPosts();
    }, [query]);

    
    return (
        <main className="flex min-h-screen bg-slate-300 p-10">
            <div className="grid grid-cols-4 gap-8 h-full">
                {posts.map(post => {
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
                            <CKEditor
                                data="<p>Conteúdo inicial</p>"
                                onChange={(event) => {
                                console.log(event.editor.getData());
                                }}
                            />
                        </div>
                    </Link>
                    </div>
                    )
                })}
            </div>
        </main>
    );
}