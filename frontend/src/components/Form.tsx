import { ReactNode } from "react";

type Props = {
    title?: string;
    action?: string;
    children: ReactNode;
    onSubmit?: () => void;
}

export const Form = ({ title, onSubmit, action = "#", children }: Props) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col content-center gap-4"
            action={action}
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
