'use client'

import React, { useState } from "react"
import { useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"
import { Button } from "@/components/Button"

export default function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: true,
            callbackUrl: "/",
        });
    }

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSignIn = (provider: string) => {
        signIn(provider, { callbackUrl });
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-300 p-10">
            <div className="flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg w-1/2">
                <div className="space-y-4 md:space-y-4 sm:p-4 w-full">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Entre ou cadastre-se
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Seu email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 rounded bg-gray-400/40 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-800">Lembrar</label>
                                </div>
                            </div> */}
                            <a
                                href="/reset-password"
                                className="text-sm font-medium text-primary-600 hover:underline text-blue-400"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        <div className="flex flex-wrap content-center justify-center">
                            <Button type="submit" typeButton="common" textButton="Entrar" />
                            {/* <button
                                onClick={() => handleSignIn("google")}
                                type="button"
                                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 m-0 p-0"
                            >
                                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Entrar com Google
                            </button> */}
                        </div>

                        <p className="text-sm font-light text-gray-800">
                            Ainda não possui cadastro?
                            <a href="/signup" className="font-medium text-blue-400 hover:underline pl-2">
                                Cadastrar
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}