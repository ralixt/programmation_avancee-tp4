"use client"

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Button} from "tp-kit/components";
import {useRouter} from "next/navigation";
import {router} from "next/client";

export default function Logout () {
    const supabase = createClientComponentClient()
    const router = useRouter()
    function logout () {
        supabase.auth.signOut()
            .then(r => router.refresh())
    }

    return(
        <Button
            onClick={logout}
            variant="outline"
            className="w-full my-4"
        >
            Se déconnecter
        </Button>

    )

}