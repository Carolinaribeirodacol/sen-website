import { Markdown } from "@/components/ui/Markdown";
import { getStrapiAPIURL } from "@/helpers/api";
import Image from "next/image";

type Props = {
    params: {
        slug: string;
    }
}

async function getPostData(slug: string) {
    try {
        const response = await fetch(
            getStrapiAPIURL(`posts/${slug}?populate=*`), 
            { cache: 'no-store' }
        );

        return response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Fail');
    }
}

async function getComments(postId: number) {
    try {
        const response = await fetch(
            getStrapiAPIURL(`comments?postId=${postId}&populate=*`), 
            { cache: 'no-store' }
        );

        return response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Fail');
    }
}

export default async function Page({params: {slug}}: Props) {    
    const { data: post } = await getPostData(slug);
    const { data: comments } = await getComments(post.id);

    return (
        <main className="flex min-h-screen bg-[url('/assets/bg.jpg')] object-cover w-full mx-auto">
            <div className="flex flex-col justify-between bg-slate-200/80 m-20 p-10 backdrop-blur-sm divide-y">
                <div>
                    <h1 className="py-6 text-center text-4xl text-purple-900 font-bold">{post.attributes.title}</h1>
                    <Markdown>{post.attributes.content}</Markdown>
                </div>
                <div className="mt-14">
                    <h2 className="pt-6 font-bold mb-6 text-gray-800">Comentários: </h2>
                    {comments.map(comment => {
                        return (
                            <div key={comment.attributes.id} className="p-6 bg-gray-200 rounded-xl w-1/3 flex flex-row">
                                <Image
                                    src="/assets/avatar.svg"
                                    width={40}
                                    height={40}
                                    alt="Picture of the author"
                                    className="mr-4"
                                />
                                <span>
                                    <h2 className="text-sm w-fit font-bold">{comment.attributes.author}</h2>
                                    <p>{comment.attributes.content}</p>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}