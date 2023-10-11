"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/Button';
import { getStrapiAPIURL } from '@/helpers/api';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';
import InputFile from '@/components/InputFile';
import { useToast } from '@/components/ui/use-toast';

export default function EditAccount() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const { toast } = useToast()

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

    const handleFileChange = (event: any) => {
        setSelectedImage(event.target.files[0]);
        setForm({ ...form, image: event.target.files[0] });
    }

    const handleSubmit = async (event: any) => {
        let responseUpload = null;
        let imageId = null;
        let responseUploadData = null;

        event.preventDefault()

        setIsLoading(true)

        const formData = new FormData();
        const { name, username, email, password } = form;

        formData.append('files', selectedImage)

        if (selectedImage) {
            responseUpload = await fetch(getStrapiAPIURL('upload'), {
                method: 'POST',
                body: formData,
            });

            responseUploadData = await responseUpload?.json()
            imageId = responseUploadData[0].id
        }

        // @ts-ignore
        const response = await fetch(getStrapiAPIURL(`users/${session?.user?.id}`), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
                image: imageId
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
                title: "Dados atualizados com sucesso",
                variant: "success"
            })
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
                        <InputFile name="image" onChange={handleFileChange} />
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