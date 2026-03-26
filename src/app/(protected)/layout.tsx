import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAuthenticatedUser } from "@/lib/auth";
import { isUserBanned } from "@/lib/db/queries/profiles";

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getAuthenticatedUser();

    // BAN check
    if (await isUserBanned(user.id)) {
        redirect("/banned");
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
