"use client"

import {
    Button,
    Card,
    NoticeMessage,
    NoticeMessageData,
    ProductCardLayout,
    ProductGridLayout,
    useZodI18n
} from "tp-kit/components";
import Link from "next/link";
import React, { useState } from "react";
import { TextInput,PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {isValid, z} from "zod";
import {AddToCartButton} from "../../../components/add-to-cart-button";


const schema = z.object({
    email : z.string().email(),
    password : z.string().min(2),
})

type FormValues = z.infer<typeof schema>;

export default function  ConnexionPage() {

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    useZodI18n(z);
    const form = useForm<FormValues>({

        initialValues: {
            email: '',
            password: '',
        },

        validate: zodResolver(schema),

    });


    return(

        <div>
            <h1 className="font-bold text-xl mb-8 ">CONNEXION</h1>
            <form className="flex flex-col my-4" onSubmit={
                form.onSubmit((values) => {
                    console.log(values);
                    setNotices([
                        {
                            type: "success",
                            message : "Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter.",
                        }
                        ])
                }
                )}>


                {notices.map((m) => (
                            <NoticeMessage
                                message={m.message}
                                type = {m.type}
                            />
                    ))
                }


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

            <div className="text-center text-brand w-full">
                <Link href="/inscription">
                    Créer un compte
                </Link>
            </div>

        </div>

    )



}