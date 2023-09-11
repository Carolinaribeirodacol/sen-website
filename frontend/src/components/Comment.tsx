"use client"

import { useState } from "react"
import { Button } from "./Button"
import { Form } from "./Form"
import { TextArea } from "./TextArea"
import { getStrapiAPIURL } from "@/helpers/api"
import { useSession } from "next-auth/react"

export const Comment = ({ postId }: number) => {
    const { data: session } = useSession()

    const [form, setForm] = useState({
        comment: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()

            const response = await fetch(
                getStrapiAPIURL('comments'),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            content: form.comment,
                            author: session?.user?.name ? session.user.name : "Anônimo",
                            post: {
                                id: postId
                            }
                        }
                    }),
                },
            );

            console.log(response)
        } catch (error) {
            console.log(error);
            throw new Error('Fail');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <TextArea text="Comentários" nameInput="comment" onChange={handleChange} placeholder="Seu comentário aqui..." />
            <Button textButton="Comentar" typeButton="submit" />
        </Form>
    )
}