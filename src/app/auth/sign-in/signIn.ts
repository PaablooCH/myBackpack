'use server';

import { auth } from '@/src/lib/auth/server';
import { redirect } from 'next/navigation';

export async function SignInWithEmail(_prevState: { error: string } | null, formData: FormData) {
    const { error } = await auth.signIn.email({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) {
        return { error: error.message || 'Failed to sign in. Try again' };
    }

    redirect('/');
}

export async function SignInWithGoogle() {
    try {
        const data = await auth.signIn.social({
            provider: 'google',
            callbackURL: '/'
        });
        console.log(data);
    } catch (error) {
        console.error("Google sign-in error:", error);
    }
}

export async function SignInWithGithub() {
    try {
        await auth.signIn.social({
            provider: 'github',
            callbackURL: '/'
        });
    } catch (error) {
        console.error("GitHub sign-in error:", error);
    }
}