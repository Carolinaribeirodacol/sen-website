"use client"

import { getPostByTag } from '@/api/getPostByTag'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
        <ul className="font-medium">
            <li>
            {posts.map(post => (
                <p key={post.id}>{post.attributes.slug}</p>
            ))}
            </li>
        </ul>
    );
}