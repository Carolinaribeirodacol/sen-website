'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { Button } from "@/components/Button"
import { TextField } from "@/components/TextField"
import { Form } from "@/components/Form"
import { useToast } from "@/components/ui/use-toast"

export default function SignIn() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(form)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setIsLoading(true)

        const response = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: true,
            callbackUrl: "/"
        });

        if (response?.error) {
            setIsLoading(false)

            return toast({
                title: "Algo deu errado",
                description: "Email ou senha inválidos",
                variant: "destructive",
            })
        }

        console.log(response)

        if (response?.ok) {
            router.push('/')
            setIsLoading(false)

            return toast({
                title: "Seja bem vindo",
                variant: "default"
            })

        }
    }

    return (
        <main className="min-h-screen bg-slate-200 p-10">
            <div className="container text-gray-800 bg-white rounded-lg p-10">
                <h1
                    className="text-xl font-bold leading-tight tracking-tight text-purple-900 text-center"
                >
                    Entre ou cadastre-se
                </h1>
                <Form onSubmit={handleSubmit} action="#">
                    <TextField text="Email" typeInput="email" nameInput="email" onChange={handleChange} placeholder="name@gmail.com" />
                    <TextField text="Senha" typeInput="password" nameInput="password" onChange={handleChange} placeholder="••••••••" />
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 rounded bg-gray-400/40 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-800">Lembrar</label>
                                </div>
                            </div> */}
                        <a
                            href="/reset-password"
                            className="text-sm font-medium text-primary-600 hover:underline text-blue-400"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        typeButton="common"
                        textButton="Entrar"
                        disabled={isLoading}
                    />
                    {/* <button
                                onClick={() => handleSignIn("google")}
                                type="button"
                                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 m-0 p-0"
                            >
                                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Entrar com Google
                            </button> */}

                    <p className="text-sm font-light text-gray-800">
                        Ainda não possui cadastro?
                        <a href="/signup" className="font-medium text-blue-400 hover:underline pl-2">
                            Cadastrar
                        </a>
                    </p>
                </Form>
            </div>
        </main>
    )
}