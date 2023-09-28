type Props = {
    text: string;
    placeholder?: string;
    nameInput?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextArea = ({ text, placeholder, nameInput, onChange }: Props) => {
    return (
        <div className="">
            <label
                className="block text-sm font-medium text-gray-800 mb-2"
            >
                {text}
            </label>
            <textarea
                rows={6}
                name={nameInput}
                onChange={() => onChange}
                className="
                    bg-gray-400/40 
                    text-gray-900 
                    md:text-md sm:text-sm 
                    rounded-lg 
                    outline-purple-900 
                    focus:ring-purple-900 
                    focus:border-purple-900 
                    block 
                    w-full 
                    p-2.5
                "
                placeholder={placeholder}
            />
        </div>
    );
};
