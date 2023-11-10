import { getStrapiAPIURL } from "@/helpers/api";

export async function getPostData() {
    try {
        const response = await fetch(
            getStrapiAPIURL('posts?populate=*'),
            { cache: 'no-store' }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error('Fail');
    }
}