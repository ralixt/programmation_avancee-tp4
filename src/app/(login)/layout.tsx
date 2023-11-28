import {Card, SectionContainer} from "tp-kit/components";
import { ZodI18nProvider } from "tp-kit/components";

export default function LoginLayout({children,}: { children: React.ReactNode }) {
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
