"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';
import InputFile from '@/components/InputFile';
import { signIn } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

export default function SignUp() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: '',
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        setIsLoading(true)

        e.preventDefault();

        const { name, username, email, password, avatar } = form;
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
                avatar
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            setIsLoading(false)

            return toast({
                title: "Algo deu errado",
                description: errorResponse.error.message,
                variant: "destructive",
            })
        } else {
            await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/",
            })
        }

        const data = await response.json();

        setIsLoading(false)

        return data;
    };

    return (
        <main className="min-h-screen bg-slate-200 p-10">
            <div className="container text-gray-800 bg-white rounded-lg p-10">
                <h1
                    className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                >
                    Cadastro
                </h1>
                <Form onSubmit={handleSubmit} action="#">
                    <InputFile name="avatar" />
                    <TextField text="Username" typeInput="text" nameInput="username" onChange={handleChange} placeholder="Maria" />
                    <TextField text="Nome e sobrenome" typeInput="text" nameInput="name" onChange={handleChange} placeholder="Maria" />
                    <TextField text="Email" typeInput="email" nameInput="email" onChange={handleChange} placeholder="name@gmail.com" />
                    <TextField text="Senha" typeInput="password" nameInput="password" onChange={handleChange} placeholder="••••••••" />

                    <Button type="submit" typeButton="common" textButton="Cadastrar" />
                </Form>
            </div>
        </main>
    )
}