"use client"
import { Button } from "@/components/ui/Button";
import { useState } from 'react';
import { fetcher } from '../../lib/api.js';
import { setToken } from '../../lib/auth.js';
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter()

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const responseData = await fetcher(
            `http://localhost:1337/api/auth/local/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            }
        );

        if (setToken(responseData)) {
            router.push('/')
        }
    };

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-300 p-10">
            <div className="flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg w-1/2">
                <div className="space-y-4 md:space-y-4 sm:p-4 w-full">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Cadastro
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Fulano de tal"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
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
                                id="password"
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="bg-gray-400/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>

                        <div className="flex flex-wrap content-center  justify-center">
                            <Button type="submit" typeButton="common" textButton="Cadastrar" />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}