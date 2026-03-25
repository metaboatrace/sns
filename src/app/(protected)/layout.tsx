import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAuthenticatedUser } from "@/lib/auth";
import { db, profiles } from "@/lib/db";

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getAuthenticatedUser();

    // BAN check
    const [profile] = await db
        .select({ bannedAt: profiles.bannedAt })
        .from(profiles)
        .where(eq(profiles.id, user.id))
        .limit(1);

    if (profile?.bannedAt) {
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
