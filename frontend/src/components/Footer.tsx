"use client"
import React, { useState } from "react";
import { Button } from "./Button";
import { Form } from "./Form";
import { TextField } from "./TextField";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { getStrapiAPIURL } from "@/helpers/api";

export const Footer = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()
    const { data: session } = useSession()

    const [form, setForm] = useState({
        email: session?.user?.email || '',
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

        const { email } = form;

        // @ts-ignore
        // const response = await fetch(getStrapiAPIURL('strapi-newsletter/newsletter/subscribe'), {
        const response = await fetch('https://api.convertkit.com/v3/tags/4977434/subscribe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: process.env.NEXT_PUBLIC_API_KEY_CONVERTKIT,
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
                title: "Email enviado com sucesso",
                variant: "success"
            })
        }

        const data = await response.json();

        setIsLoading(false)

        return data;

    };


    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <Form onSubmit={handleSubmit} action="#" autoComplete="off">
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    <div className="flex items-center gap-6 p-4">
                        <h3 className="text-purple-900 text-md font-bold">Seja avisado quando houver novos textos ou novidades gratuitamente!</h3>
                    </div>
                    
                    <div className="w-full p-4">
                        <TextField text="Email" typeInput="email" nameInput="email" value={form.email} onChange={handleChange} placeholder="name@gmail.com" />
                    </div>

                    <Button disabled={isLoading} type="submit" typeButton="common" textButton="Enviar" />
                </div>
            </Form>
        </footer>
    );
}