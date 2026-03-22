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
        <div className='min-h-screen background flex flex-row' suppressHydrationWarning>
            <SessionProvider session={session}>
                <SideBarComponent />
                {children}
            </SessionProvider>
        </div>
    );
}