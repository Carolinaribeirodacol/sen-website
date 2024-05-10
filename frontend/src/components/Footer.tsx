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
       const response = await fetch('https://api.convertkit.com/v3/forms/6517940/subscribe', {
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
        <footer className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
            <form className="flex flex-row flex-wrap align-center justify-around items-center gap-4" 
                onSubmit={handleSubmit} 
                action="#" 
                autoComplete="off"
            >
                <h3 className="text-purple-900 text-sm font-bold flex-none">
                    Seja avisado quando houver novos textos ou novidades gratuitamente!
                </h3>
                
                <div className="flex-grow">
                    <TextField
                        text=""
                        typeInput="email"
                        nameInput="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Digite seu email"
                    />
                </div>

                <div className="flex-none">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        typeButton="common"
                        textButton="Enviar"
                    />
                </div>
            </form>
        </footer>
    );
}