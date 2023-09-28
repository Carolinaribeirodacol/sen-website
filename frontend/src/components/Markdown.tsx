import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Props = {
  children: string;
  className?: string;
};

export const Markdown = ({ children, className }: Props) => {
  return (
    // @ts-ignore
    <ReactMarkdown rehypePlugins={[rehypeRaw]} className={className}>
      {children}
    </ReactMarkdown>
  );
};
