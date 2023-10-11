"use client"
import InputFile from '@/components/InputFile';
import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';
import { signIn } from 'next-auth/react';
import { toast, useToast } from '@/components/ui/use-toast';

export default function SignUp() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()

    const [form, setForm] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (event: any) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e: any) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            const { username, name, email, password } = form;
            const response = await fetch(getStrapiAPIURL('auth/local/register'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    name,
                    email,
                    password
                }),
            });

            if (!response?.ok) {
                return toast({
                    title: "Algo deu errado.",
                    description: "Confira os dados e tente novamente.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Seja bem vindo",
                    variant: "success"
                })

                await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                });
            }

            const data = await response.json();
            setIsLoading(false);

            return data;
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
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