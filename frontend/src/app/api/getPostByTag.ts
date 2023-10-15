import { getStrapiAPIURL } from "@/helpers/api";

export async function getPostByTag(tag: string) {
    try {
        const response = await fetch(
            getStrapiAPIURL(`posts?populate=*&filters[tags][name][$contains]=${tag}`), 
            { cache: 'no-store' }
        );

        return response.json();
    } catch (error) {
        throw new Error('Fail');
    }
}