"use client";

import { authClient } from "@/src/lib/auth/client";
import { Session, User } from "@/src/types/authTypes";
import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";

type SessionContextValue = Session & { loading: boolean, refresh: () => Promise<void>, updateUser: (fields: Partial<User>) => void };

export const SessionContext = createContext<SessionContextValue>({
    user: null,
    session: null,
    loading: true,
    refresh: async () => {},
    updateUser: () => {},
});

export function SessionProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<Session>({ user: null, session: null });
    const [loading, setLoading] = useState(true);

    const fetchSession = useCallback(async () => {
        try {
            const { data: sessionData } = await authClient.getSession();
            // console.log("🚀 ~ SessionProvider ~ data:", sessionData)
            setData({
                session: sessionData?.session ?? null,
                user: sessionData?.user ?? null,
            });
        } catch (error) {
            console.error("Failed to fetch session:", error);
            setData({ user: null, session: null });
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUser = useCallback((fields: Partial<SessionContextValue["user"]>) => {
        setData(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...fields } : null
        }));
    }, []);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    return (
        <SessionContext.Provider value={{ ...data, loading, refresh: fetchSession, updateUser: updateUser}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionContext = () => useContext(SessionContext);