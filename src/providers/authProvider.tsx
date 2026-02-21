import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "../lib/auth/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <NeonAuthUIProvider
            authClient={authClient}
            emailOTP
            social={{  
                providers: ['google', 'github']  
            }} 
            credentials={{ forgotPassword: true }} 
            organization
        >
            {children}
        </NeonAuthUIProvider>
    )
}