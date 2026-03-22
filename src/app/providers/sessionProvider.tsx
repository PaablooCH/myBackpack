"use client";

import { Session } from "@/src/types/authTypes";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";

type SessionContextValue = Session & { refresh: () => Promise<void> };

export const SessionContext = createContext<SessionContextValue>({
    session: null,
    user: null,
    refresh: async () => {},
});

type Props = {
    children: ReactNode,
    session: Session
}

export function SessionProvider({ children, session }: Props) {
    const router = useRouter();

    return (
        <SessionContext.Provider value={{ ...session, refresh: () => router.refresh()}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionContext = () => useContext(SessionContext);