import {Card} from "tp-kit/components";

export default function LoginLayout({children,}: { children: React.ReactNode }) {
    return (
        <Card className="bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-xl mx-auto my-8">
            {children}
        </Card>

    )
}
