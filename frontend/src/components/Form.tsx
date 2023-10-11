import { ReactNode } from "react";

type Props = {
    title?: string;
    action?: string;
    children: ReactNode;
    autoComplete?: string;
    onSubmit?: (param?: any, param2?: any) => void;
}

export const Form = ({ title, onSubmit, action = "#", children, ...props }: Props) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col content-center gap-4"
            action={action}
            {...props}
        >
            <h1
                className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
            >
                {title}
            </h1>
            {children}
        </form>
    );
};
