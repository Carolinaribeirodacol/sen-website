"use client"

import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPostByTag } from '../api/getPostByTag'
import { Image } from '@/components/Image'

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
                {posts ?
                    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    </div>
                    :
                    <h1>Nenhum texto encontrado</h1>
                }
            </div>
        </main>
    );
}