import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Props = {
  children: string;
  className?: string;
};

export const Markdown = ({ children, className }: Props) => {
  return (
    <ReactMarkdown
      // @ts-ignore
      transformimageuri={uri =>
        uri.startswith("http") ? uri : `${process.env.NEXTAUTH_URL}${uri}`
      }
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
      className={className}>
      {children}
    </ReactMarkdown>
  );
};
