type Props = {
    text: string;
    typeInput: string;
    nameInput: string;
    placeholder?: string;
    onChange?: (param?: any, param2?: any) => void;
}

export const TextField = ({ text, onChange, typeInput, nameInput, placeholder }: Props) => {
    return (
        <div className="">
            <label
                className="block text-sm font-medium text-gray-800 mb-2"
            >
                {text}
            </label>
            <input
                type={typeInput}
                name={nameInput}
                onChange={onChange}
                placeholder={placeholder}
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
            />
        </div>
    );
};
