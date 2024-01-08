"use client"

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { TextField } from "@/components/TextField";
import { toast } from "@/components/ui/use-toast";
import { getStrapiAPIURL } from "@/helpers/api";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPassword() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams()

    const urlCode = searchParams?.get('code')

    const [form, setForm] = useState({
        password: '',
        passwordConfirmation: '',
        code: urlCode
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

        const { password, passwordConfirmation, code } = form;

        // @ts-ignore
        const response = await fetch(getStrapiAPIURL('auth/reset-password'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                passwordConfirmation,
                code
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
                title: "Senha alterada com sucesso",
                variant: "success"
            })
        }

        const data = await response.json();

        setIsLoading(false)

        return data;
    }

    return (
        <main className="min-h-screen bg-slate-200 p-10">
            <div className="container text-gray-800 bg-white rounded-lg p-10">
                <div className="space-y-4 md:space-y-4 sm:p-4 w-full">
                    <h1
                        className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                    >
                        Editar cadastro
                    </h1>
                    <Form onSubmit={handleSubmit} action="#" autoComplete="off">
                        <TextField text="Senha" typeInput="password" nameInput="password" onChange={handleChange} placeholder="••••••••" autoComplete='new-password' />
                        <TextField text="Confirme a senha" typeInput="password" nameInput="passwordConfirmation" onChange={handleChange} placeholder="••••••••" autoComplete='new-password' />

                        <Button disabled={isLoading} type="submit" typeButton="common" textButton="Atualizar" />
                    </Form>
                </div>
            </div>
        </main>
    )
}
