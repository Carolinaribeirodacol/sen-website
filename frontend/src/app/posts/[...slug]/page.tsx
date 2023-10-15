import { Comment } from "@/components/Comment";
import { Markdown } from "@/components/Markdown";
import { UserAvatar } from "@/components/UserAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getStrapiAPIURL } from "@/helpers/api";
import { getCurrentUser } from "@/lib/session";

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

export default async function Page({ params: { slug } }: Props) {
    const user = await getCurrentUser()
    const { data: post } = await getPostData(slug);

    return (
        <main className="min-h-screen bg-slate-200 p-10">
            <div className="container text-gray-800 bg-white rounded-lg p-10">
                <h1 className="py-6 text-center text-4xl text-purple-900 font-bold">{post.attributes.title}</h1>
                <article className="prose-xl prose-a:text-red-500">
                    <Markdown className="break-all">{post.attributes.content}</Markdown>
                </article>

                <div className="mt-14">
                    <Comment postId={post.id} />
                    {post.attributes.comments.data.map((comment: any) => {
                        return (
                            <div key={comment.attributes.id} className="p-6 bg-gray-200 rounded-xl flex flex-row mt-6 space-x-4">
                                {user ? (
                                    <UserAvatar user={user} />
                                ) : (
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>

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