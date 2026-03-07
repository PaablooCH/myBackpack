"use client";

import { authClient } from "@/src/lib/auth/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type SessionContextValue = {
    user: { id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        banned: boolean | null | undefined;
        role?: string | null | undefined;
        banReason?: string | null | undefined;
        banExpires?: Date | null | undefined; } | null;
    session: { id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
        impersonatedBy?: string | null | undefined;
        activeOrganizationId?: string | null | undefined; } | null;
    loading: boolean;
};

export const SessionContext = createContext<SessionContextValue>({
    user: null,
    session: null,
    loading: true,
});

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<SessionContextValue["session"]>(null);
    const [user, setUser] = useState<SessionContextValue["user"]>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await authClient.getSession();
                setSession(data?.session ?? null);
                console.log(data?.user);
                setUser(data?.user ?? null);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ user, session, loading }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionContext = () => useContext(SessionContext);