import {ReactNode} from "react";
import {Button, Card, SectionContainer} from "tp-kit/components";
import prisma from "../../utils/prisma";
import {OrderTable} from "../../components/order-table";
import getUser from "../../utils/supabase";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Logout from "../../components/logout";

export default async function Layout({children}: { children: ReactNode }) {
    const orders = await prisma.order.findMany();
    const supabase = createServerComponentClient({cookies});
    const user = await getUser(supabase)
    console.log(user)

    if(!user) {
        redirect("/connexion")
    }

    return (
        <>
            {/* Orders list */}


            <SectionContainer wrapperClassName="flex flex-row py-24 w-full">

                <Card className="mr-12 w-[45rem] h-fit">
                    <h1 className="mb-4">MON COMPTE</h1>
                    <p className="mb-4">Bonjour {user.user_metadata.name} !</p>
                    <p><span className="font-bold">Nom : </span>{user.user_metadata.name}</p>
                    <p className="mb-8"><span className="font-bold">Email : </span>{user.email}</p>

                    <Logout></Logout>

                </Card>

                <div className="bg-white rounded-lg p-6 shadow-lg min-h-[80vh] w-full">
                    <OrderTable orders={orders} />
                </div>
            </SectionContainer>




            {/* Children */}
            {children}
        </>
    );
}
