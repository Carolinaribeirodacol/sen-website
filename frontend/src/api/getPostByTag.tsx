import { getStrapiAPIURL } from "@/helpers/api";

export async function getPostByTag(tag: string) {
    try {
        const response = await fetch(
            getStrapiAPIURL(`posts?populate=*&filters[tags][name][$eq]=${tag}`), 
            { cache: 'no-store' }
        );

        return response.json();
    } catch (error) {
        console.log(error)
        throw new Error('Fail');
    }
}