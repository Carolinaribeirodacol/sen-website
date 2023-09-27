"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';

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
                password
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
        <main className="flex justify-center items-center min-h-screen bg-slate-200">
            <div className="flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg">
                <div className="w-96 space-y-4 md:space-y-4 sm:p-4">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Cadastro
                    </h1>
                    <Form onSubmit={handleSubmit} action="#">
                        <TextField text="Username" typeInput="text" nameInput="username" onChange={handleChange} placeholder="Maria" />
                        <TextField text="Nome e sobrenome" typeInput="text" nameInput="name" onChange={handleChange} placeholder="Maria" />
                        <TextField text="Email" typeInput="email" nameInput="email" onChange={handleChange} placeholder="name@gmail.com" />
                        <TextField text="Senha" typeInput="password" nameInput="password" onChange={handleChange} placeholder="••••••••" />

                        <Button type="submit" typeButton="common" textButton="Cadastrar" />
                    </Form>
                </div>
            </div>
        </main>
    )
}