import { SessionProvider } from "../providers/sessionProvider";
import SideBarComponent from "@/src/components/sideBarComponent";
import { GetSession } from "@/src/lib/auth/server";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await GetSession();

    return (
        <div className='min-h-screen background' suppressHydrationWarning>
            <SessionProvider session={session}>
                <SideBarComponent />
                <div className="ml-64">
                    {children}
                </div>
            </SessionProvider>
        </div>
    );
}