import NextImage from 'next/image';
import { getStrapiMedia } from '@/helpers/media';

export const Image = ({ image, className }: any) => {
    const { url, alternativeText, width, height } = image.data.attributes;


    return (
        <NextImage
            className={className}
            width={width || '100%'}
            height={height || '100%'}
            src={getStrapiMedia(image)}
            alt={alternativeText || ''}
        />
    );
};
