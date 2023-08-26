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
    <div>
        <form onSubmit={handleSubmit}>   
            <label className="mb-2 text-sm font-medium text-gray-100 sr-only">Buscar</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-100 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    type="search" id="default-search" 
                    className="block w-full p-4 px-14 text-sm border 
                        rounded-lg bg-gray-400 focus:ring-purple-900
                        dark:placeholder-gray-300" 
                    placeholder="natureza, amizade..."
                    required
                    name="fieldTagName"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <button type="submit" className="absolute right-2.5 bottom-2.5 bg-purple-900 hover:bg-purple-950 
                    focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg 
                    text-sm px-4 py-2 dark:bg-white text-purple-900 hover:text-white"
                >Buscar</button>
            </div>
        </form>
    </div>
  );
};
