import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Props = {
  children: string;
  className?: string;
};

export const Markdown = ({ children, className }: Props) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ src, srcSet, node, ...props }) => {
          src = `${process.env.NEXT_PUBLIC_API_URL}${src}`

          const sources = srcSet?.split(',').map(source => {
            const [relativePath, size] = source.trim().split(' ');
            const absolutePath = `${process.env.NEXT_PUBLIC_API_URL}${relativePath}`;
            return `${absolutePath} ${size}`;
          })

          const absoluteSrcSet = sources?.join(', ');

          return <img src={src} srcSet={absoluteSrcSet} {...props} />
        }
      }}
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
      className={className}>
      {children}
    </ReactMarkdown>
  );
};
