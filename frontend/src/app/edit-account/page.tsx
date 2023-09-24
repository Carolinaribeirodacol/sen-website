"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';

export default function EditAccount() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        image: ''
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setIsLoading(true)

        const { name, username, email, password } = form;

        const response = await fetch(getStrapiAPIURL(`users/${session?.user?.id}`), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${}`,
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
                // image
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error.message);
        }

        const data = await response.json();

        console.log(data, response)

        setIsLoading(false)

        return data;

    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-300 p-10">
            <div className="flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg w-1/2">
                <div className="space-y-4 md:space-y-4 sm:p-4 w-full">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Editar cadastro
                    </h1>
                    <Form onSubmit={handleSubmit} action="#">
                        <TextField text="Username" typeInput="text" nameInput="username" onChange={handleChange} placeholder="Maria" />
                        <TextField text="Nome e sobrenome" typeInput="text" nameInput="name" onChange={handleChange} placeholder="Maria" />
                        <TextField text="Email" typeInput="email" nameInput="email" onChange={handleChange} placeholder="name@gmail.com" />
                        <TextField text="Senha" typeInput="password" nameInput="password" onChange={handleChange} placeholder="••••••••" />

                        <Button disabled={isLoading} type="submit" typeButton="common" textButton="Atualizar" />
                    </Form>
                </div>
            </div>
        </main>
    )
}