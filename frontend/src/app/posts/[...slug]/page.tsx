import { Comment } from "@/components/Comment";
import { Image } from "@/components/Image";
import { Markdown } from "@/components/Markdown";
import { getStrapiAPIURL } from "@/helpers/api";

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
        throw new Error('Fail');
    }
}

export default async function Page({ params: { slug } }: Props) {
    const { data: post } = await getPostData(slug);
    const { data: comments } = await getComments(post.id);

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-300 p-10">
            <div className="text-gray-800 bg-white rounded-lg p-10">
                <div>
                    <h1 className="py-6 text-center text-4xl text-purple-900 font-bold">{post.attributes.title}</h1>
                    <Markdown className="break-all">{post.attributes.content}</Markdown>
                </div>
                <div className="mt-14">
                    <Comment />
                    {comments.map((comment: any) => {
                        return (
                            <div key={comment.attributes.id} className="p-6 bg-gray-200 rounded-xl flex flex-row mt-6">
                                {comment.attributes && comment.attributes.image && comment.attributes.image.data ? (
                                    <Image
                                        image={comment.attributes.image}
                                        alt="Picture of the author"
                                        className="mr-4 w-20 h-20"
                                    />
                                ) : (
                                    <div className="w-6 h-6 bg-purple-900"></div>
                                )}
                                <span>
                                    <h2 className="text-md w-fit font-bold">{comment.attributes.author}</h2>
                                    <p className="text-sm break-all">{comment.attributes.content}</p>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}