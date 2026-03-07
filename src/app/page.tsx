import Link from 'next/link';
import { auth } from '../lib/auth/server';

// Server components using auth methods must be rendered dynamically
export const dynamic = 'force-dynamic';

export default async function Home() {
    const { data } = await auth.getSession();
    
    if (data?.user) {
        return (
        <div className="flex flex-col gap-2 min-h-screen items-center justify-center background">
            <h1 className="mb-4 text-4xl">
                Logged in as <span className="font-bold underline">{data.user.name}</span>
            </h1>
            <Link href={"/dashboard"}>Go to Dashboard</Link>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 min-h-screen items-center justify-center background">
            <h1 className="mb-4 text-4xl font-bold">Not logged in</h1>
            <div className="flex items-center gap-2">
                <Link href="/auth/sign-up" className="inline-flex text-lg text-indigo-400 hover:underline">
                    Sign-up
                </Link>
                <Link href="/auth/sign-in" className="inline-flex text-lg text-indigo-400 hover:underline">
                    Sign-in
                </Link>
            </div>
        </div>
    );
}