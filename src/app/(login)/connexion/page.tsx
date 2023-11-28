"use client"

import {Button, Card} from "tp-kit/components";
import Link from "next/link";
import React from "react";
import { TextInput,PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {z} from "zod";


const schema = z.object({
    email : z.string().email(),
    password : z.string().min(2),
})

export default function  ConnexionPage() {

    const form = useForm({

        validate: zodResolver(schema),

        initialValues: {
            email: '',
            password: '',
        },

    });


    return(
        <div>
            <h1 className="font-bold text-xl mb-8 ">CONNEXION</h1>
            <form className="flex flex-col my-4" onSubmit={form.onSubmit((values) => console.log(values))}>


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
                    // onClick={function noRefCheck(){}}
                    variant="primary"
                    type="submit"
                >
                    Se connecter
                </Button>

            </form>

            <div className="text-center text-green w-full">
                <Link href="/inscription">
                    Créer un compte
                </Link>
            </div>

        </div>

    )



}