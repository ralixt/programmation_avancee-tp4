"use client"

import {Button, NoticeMessage, NoticeMessageData, useZodI18n} from "tp-kit/components";
import Link from "next/link";
import React, {useCallback, useState} from "react";
import { TextInput,PasswordInput } from '@mantine/core';
import { useForm,zodResolver } from '@mantine/form';
import { z } from 'zod';
import { ZodI18nProvider } from "tp-kit/components";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {redirect, useRouter} from 'next/navigation'
import type { Database } from '@/lib/database.types'
import {For} from "@babel/types";

const schema = z.object({
    name : z.string().min(2),
    email : z.string().email().nonempty(),
    password : z.string().min(2),

})

type FormValues = z.infer<typeof schema>;


export default function InscriptionPage() {

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);


    useZodI18n(z);
    const form = useForm<FormValues>({

        initialValues: {
            name:'',
            email: '',
            password: '',
        },

        validate: zodResolver(schema),

    });

    const router = useRouter()
    const supabase = createClientComponentClient<Database>()


    const handleSignUp = useCallback(async function (values: FormValues) {
        setNotices([
            {
                type: "success",
                message : "Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter.",
            }
        ])


        console.log(values);

        const { data, error } = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/api/auth/callback',
                    data: {
                        name: values.name,
                    }
                }
            }
        );

        if(error) {
            setNotices([
                {
                    type: "error",
                    message : "Cette adresse n'est pas disponible",
                }
            ])
        }
        console.log(error)
    }, []);


    return(
        <div>
            <h1 className="font-bold text-xl mb-8 ">INSCRIPTION</h1>

            <form className="flex flex-col my-4" onSubmit={form.onSubmit(handleSignUp)}>

                {notices.map((m) => (
                    <NoticeMessage
                        message={m.message}
                        type = {m.type}
                    />
                ))
                }

                <TextInput
                    label="Nom"
                    description="Le nom qui sera utilisé pour vos commandes"
                    placeholder="Maud Zarella"
                    withAsterisk
                    className="mb-8"
                    {...form.getInputProps('name')}
                />

                <TextInput
                    label="Adresse email"
                    placeholder="lin.guini@barilla.it"
                    withAsterisk
                    className="mb-8"
                    {...form.getInputProps('email')}
                />


                <PasswordInput
                    label="Mot de passe"
                    placeholder="Ke$$a..."
                    withAsterisk
                    className="mb-8"
                    {...form.getInputProps('password')}
                />


                <Button
                    variant="primary"
                    type="submit"
                >
                    S'inscrire
                </Button>

            </form>

            <div className="text-center text-brand w-full">
                <Link href="/connexion">
                    Déjà un compte ? Se connecter
                </Link>
            </div>


        </div>
    )
}