'use client';

import { useActionState, useState } from 'react';
import { SignInWithEmail } from './signIn';
import { FaGithubAlt, FaGoogle } from 'react-icons/fa';
import { authClient } from '@/src/lib/auth/client';

export default function SignInForm() {
    const [state, formAction, isPending] = useActionState(SignInWithEmail, null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function SignInWithGoogle() {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/'
            });
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    }
    
    async function SignInWithGithub() {
        try {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/'
            });
        } catch (error) {
            console.error("GitHub sign-in error:", error);
        }
    }

    return (
        <div className="flex flex-col gap-2 min-h-dvh items-center justify-center background">
            <form action={formAction} className='flex flex-col gap-5 items-center justify-center'>

                <div className="w-sm">
                    <h1 className="mt-10 text-center text-2xl/9 font-bold headline">Sign in to your account</h1>
                </div>

                <div className='flex flex-col gap-1.5 w-sm'>
                    <label htmlFor="email" className="block text-sm font-medium paragraph">Email address</label>
                    <input id="email" name="email" type="email" required placeholder="john@my-company.com" value={email} onChange={(e) => handleEmailChange(e)}
                    className="block rounded-md w-full bg-black/5 px-2 py-1.5 placeholder:text-gray-500 paragraph outline-1 outline-black/10  focus:outline-(--icon-highlight)"/>
                </div>

                <div className='flex flex-col gap-1.5 w-sm'>
                    <label htmlFor="password" className="block text-sm font-medium paragraph">Password</label>
                    <input id="password" name="password" type="password" required placeholder="*****" value={password} onChange={(e) => handlePasswordChange(e)}
                    className="block rounded-md w-full bg-black/5 px-2 py-1.5 placeholder:text-gray-500 paragraph outline-1 outline-black/10  focus:outline-(--icon-highlight)"/>
                </div>

                {state?.error && (
                    <div className="rounded-md px-3 py-2 text-sm text-red-500">
                    {state.error}
                    </div>
                )}

                <button type="submit" disabled={isPending}
                    className="btn w-sm text-sm/6">
                    {isPending ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
            <div className='flex h-fit w-sm gap-1'>
                <span className='my-auto h-0.5 w-sm bg-(--paragraph)/50'></span>
                <span className='text-sm italic text-(--paragraph)/50'>or</span>
                <span className='my-auto h-0.5 w-sm bg-(--paragraph)/50'></span>
            </div>
            <div className='grid grid-cols-1 gap-2 w-sm'>
                <button className="btn bg-white outline-(--icon-stroke) outline-1 w-sm text-sm/6" onClick={SignInWithGoogle}>
                    <FaGoogle className='size-5'/> Sign in with Google
                </button>
                <button className="btn bg-white outline-(--icon-stroke) outline-1 w-sm text-sm/6" onClick={SignInWithGithub}>
                    <FaGithubAlt className='size-5'/> Sign in with Github
                </button>

            </div>
            <div className="text-center text-sm paragraph">Don&apos;t have an account? <a href="/auth/sign-up" className="text-blue-500 hover:underline">Sign up</a></div>
        </div>
    );
}