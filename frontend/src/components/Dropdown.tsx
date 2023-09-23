import { ReactNode, useState } from "react"
import Icon from '@mdi/react';
import { mdiMenuUp, mdiMenuDown } from '@mdi/js';

type Props = {
    children?: ReactNode,
    title?: string | null | undefined
}

export const Dropdown = ({ children, title = "Perfil" }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center w=[340px] h=[340px] rounded-lg">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-purple-900 px-10 py-2 w-full flex items-center justify-between
                    font-semibold text-lg rounded-lg tracking-wider border-4 border-transparent
                    active:border-white duration-300 active:text-white"
            >
                {title}
                {!isOpen ? (
                    <Icon path={mdiMenuDown} size={1} />
                ) : (
                    <Icon path={mdiMenuUp} size={1} />
                )}
            </button>

            {isOpen && (
                <div className="bg-purple-900 absolute top-14 flex flex-col items-start rounded-lg p-4 w-full">
                    {children}
                </div>
            )}
        </div >
    )
}