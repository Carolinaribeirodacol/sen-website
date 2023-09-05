import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Props = {
  children: string;
  className?: string;
};

export const Markdown = ({ children, className }: Props) => {
  return (
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
};
