import {Button} from "tp-kit/components";
import Link from "next/link";


export default function InscriptionPage() {

    return(
        <div>
            <h1 className="font-bold text-xl mb-8 ">INSCRIPTION</h1>
            <form className="flex flex-col my-4">

                <label htmlFor="name">Nom <span className="text-red-500">*</span></label>
                <p className="text-gray-400">Le nom qui sera utilisé pour vos commandes</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Maud Zarella"
                    className="p-4 rounded-lg bg-gray-100 mb-8"

                />

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
                    placeholder="Ke$$a1234"
                    className="p-4 rounded-lg bg-gray-100 mb-8"
                />


                <Button
                    // onClick={function noRefCheck(){}}
                    variant="primary"
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