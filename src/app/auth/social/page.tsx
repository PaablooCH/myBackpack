'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/src/lib/auth/client';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const error = searchParams.get('error');
        console.log('searchParams', searchParams.toString());
        if (error) {
            // Redirect back to sign-in with error info
            console.error('error', error);
            router.replace(`/auth/sign-in?error=${encodeURIComponent(error)}`);
            return;
        }
        authClient.getSession().then(({ data }) => {
            console.log(data)
            // Default: go to dashboard
            router.replace('/dashboard');
        });
        
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center min-h-dvh">
            <p className="paragraph">Sign in...</p>
        </div>
    );
}
