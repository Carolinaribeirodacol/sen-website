"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

export const SearchBar = () => {
    const router = useRouter();
    const [tag, setTag] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        router.push(`/search?query=${tag}`)
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="mb-2 text-sm font-medium text-gray-100 sr-only">Buscar</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="bg-gray-400/40 
                        text-gray-900 
                        md:text-md sm:text-sm 
                        rounded-lg 
                        outline-purple-900 
                        focus:ring-purple-900 
                        focus:border-purple-900
                        block 
                        w-full
                        px-14 p-4"
                    // className="block w-full p-4 px-14 text-sm border 
                    //     rounded-lg bg-gray-400 focus:ring-purple-900"
                    placeholder="natureza, amizade..."
                    required
                    name="fieldTagName"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <button
                    type="submit"
                    className="
                            absolute right-2.5 bottom-2.5 
                            bg-purple-900 hover:bg-purple-950 text-white
                            font-medium text-sm
                            rounded-lg px-4 py-2
                        "
                >
                    Buscar
                </button>
            </div>
        </form>
    );
};
