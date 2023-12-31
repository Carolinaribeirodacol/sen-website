import React from 'react';
import { Icon } from './Icon';

type Props = {
  typeButton?: string;
  type?: "button" | "submit" | "reset" | undefined;
  textButton?: string;
  onClick?: (event: any) => void;
  disabled?: boolean;
};

export const Button = ({ typeButton, type, textButton, onClick, ...props }: Props) => {
  return (
    <div className="flex flex-wrap content-center justify-center">
      {typeButton === 'google' ? (
        <button
          onClick={onClick}
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 m-0 p-0 transition duration-150 easy-in-out"
        >
          <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
          </svg>
          Entrar com Google
        </button>
      ) : typeButton === 'facebook' ? (
        <button
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 transition duration-150 easy-in-out"
        >
          <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
            <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
          </svg>
          Entrar com Facebook
        </button>
      ) : (
        <button
          onClick={onClick}
          type={type}
          className="inline-flex text-white bg-purple-900 hover:bg-purple-950 focus:ring-2 font-medium rounded-lg text-sm px-8 py-2.5 transition duration-150 easy-in-out disabled:bg-purple-900/60"
          {...props}
        >
          {props.disabled &&
            <Icon name="mdiRefresh" className="mr-2 h-4 w-4 animate-spin" />
          }
          {textButton}
        </button>
      )}
    </div>
  );
};
