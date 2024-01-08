"use client"
import { Button } from '@/components/Button';
import { toast } from '@/components/ui/use-toast';
import { getStrapiAPIURL } from '@/helpers/api';
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };

    const handleSubmit = async (event: any) => {
        
        event.preventDefault()
        setIsLoading(true)

        // @ts-ignore
        const response = await fetch(getStrapiAPIURL('auth/forgot-password'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
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
                title: "Email enviado",
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
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <h1
                            className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                        >
                            Esqueceu a senha?
                        </h1>
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

                        <Button disabled={isLoading} type="submit" typeButton="common" textButton="Enviar" />
                    </form>
                </div>
            </div>
        </main>
    )
}
