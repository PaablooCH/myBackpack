import { Session } from '@/src/types/auth/authTypes';
import { createAuthServer } from '@neondatabase/auth/next/server';
import { redirect } from 'next/navigation';

export const auth = createAuthServer();

export async function GetSession(): Promise<Session> {
    const session = (await auth.getSession()).data;
    if (!session?.user)
    {
        redirect('/sing-in');
    }
    return session;
}