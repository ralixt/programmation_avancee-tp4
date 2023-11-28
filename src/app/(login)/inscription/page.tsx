"use client"


import {Button} from "tp-kit/components";
import Link from "next/link";
import React from "react";
import { TextInput,PasswordInput } from '@mantine/core';
import { useForm,zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
    name : z.string().min(2),
    email : z.string().email(),
    password : z.string().min(2),
})

export default function InscriptionPage() {

    const form = useForm({

        validate: zodResolver(schema),

        initialValues: {
            name:'',
            email: '',
            password: '',
        },


    });

    return(
        <div>
            <h1 className="font-bold text-xl mb-8 ">INSCRIPTION</h1>
            <form className="flex flex-col my-4" onSubmit={form.onSubmit((values) => console.log(values))}>


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
                    Se connecter
                </Button>

            </form>

            <div className="text-center text-green w-full">
                <Link href="/connexion">
                    Déjà un compte ? Se connecter
                </Link>
            </div>

        </div>
    )
}