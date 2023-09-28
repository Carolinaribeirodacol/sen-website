"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';
import InputFile from '@/components/InputFile';

export default function EditAccount() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
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

        const { name, username, email, password, avatar } = form;

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
                avatar
            }),
        }).catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: " + error.message
            );
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error.message);
        }

        const data = await response.json();

        setIsLoading(false)

        return data;

    };

    return (
        <main className="min-h-screen bg-slate-200 p-10">
            <div className="container text-gray-800 bg-white rounded-lg p-10">
                <div className="space-y-4 md:space-y-4 sm:p-4 w-full">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Editar cadastro
                    </h1>
                    <Form onSubmit={handleSubmit} action="#">
                        <InputFile name="avatar" />
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