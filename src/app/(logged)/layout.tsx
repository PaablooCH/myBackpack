import { SessionProvider } from "../providers/sessionProvider";
import SideBarComponent from "@/src/components/sideBarComponent";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='min-h-screen background flex flex-row' suppressHydrationWarning>
            <SessionProvider>
                <SideBarComponent />
                {children}
            </SessionProvider>
        </div>
    );
}