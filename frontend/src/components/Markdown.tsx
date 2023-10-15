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
      transformImageUri={uri =>
        uri.startsWith("http") ? uri : `${process.env.NEXTAUTH_URL}${uri}`
      }
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
      allowedImageHandlers={['data:image/png;base64', 'data:image/gif;base64', 'data:image/jpeg;base64', 'https://', 'http://', 'localimage://']}
      className={className}>
      {children}
    </ReactMarkdown>
  );
};
