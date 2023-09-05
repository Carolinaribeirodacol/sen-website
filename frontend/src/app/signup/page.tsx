"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';

export default function SignUp() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const { name, username, email, password } = form;
        const response = await fetch(getStrapiAPIURL('auth/local/register'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error.message);
        }

        const data = await response.json();

        router.push('/signin')

        return data;

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
                                Nome de usuário
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
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