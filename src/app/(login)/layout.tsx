import {Card, SectionContainer} from "tp-kit/components";
import { ZodI18nProvider } from "tp-kit/components";
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import getUser from "../../utils/supabase";

export default async function LoginLayout({children,}: { children: React.ReactNode }) {

    const supabase = createServerComponentClient({cookies})
    const user = await getUser(supabase)
    console.log(user)
    if(user) {
        redirect("/mon-compte")
    }


    return (
        <SectionContainer>
            <Card className="bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-xl mx-auto my-8">
                <ZodI18nProvider>
                    {children}
                </ZodI18nProvider>
            </Card>
        </SectionContainer>


    )
}
