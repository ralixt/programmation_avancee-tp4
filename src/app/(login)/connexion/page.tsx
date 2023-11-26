"use client"

import {Button, Card} from "tp-kit/components";
import Link from "next/link";

export default function  ConnexionPage() {

    return(
        <div>
            <h1 className="font-bold text-xl mb-8 ">CONNEXION</h1>
            <form className="flex flex-col my-4">

                <label htmlFor="email">Adresse email <span className="text-red-500">*</span></label>
                <input
                    type="email"
                    name="email"
                    placeholder="lin.guini@barilla.it"
                    className="p-4 rounded-lg bg-gray-100 mb-8"

                />

                <label htmlFor="password">Mot de passe <span className="text-red-500">*</span></label>
                <input
                    type="password"
                    name="password"
                    placeholder="Ke$$a..."
                    className="p-4 rounded-lg bg-gray-100 mb-8"
                />


                <Button
                    // onClick={function noRefCheck(){}}
                    variant="primary"
                >
                    Se connecter
                </Button>

                {/*<button type="submit">Submit</button>*/}
            </form>

            <div className="text-center text-green w-full">
                <Link href="/inscription">
                    Créer un compte
                </Link>
            </div>

        </div>

    )



}