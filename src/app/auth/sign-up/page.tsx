'use client';

import { useActionState, useEffect, useState } from 'react';
import { signUpWithEmail } from './actions';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { authClient } from '@/src/lib/auth/client';
import Link from 'next/link';

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState(signUpWithEmail, null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [session, setSession] = useState(null);

    const router = useRouter();

    useEffect(() => {
        authClient.getSession().then(({ data }) => {
            setSession(data);
        });
    }, []);
    
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    if (session?.session) {
        return (
            <div className='min-h-screen flex items-center flex-col justify-center gap-4'>
                <h1 className="mt-10 text-center text-2xl/9 font-bold headline">You are already signed in</h1>
                <button className="btn text-sm/6" onClick={() => router.replace('/dashboard')}>
                    Go To Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className='relative background'>
            <Link href={'/'}>
                <FaArrowLeft className="absolute left-4 top-4 size-4"/>
            </Link>
            <form action={formAction} className="flex flex-col gap-5 min-h-dvh items-center justify-center">

                <div className="w-sm">
                    <h1 className="mt-10 text-center text-2xl/9 font-bold headline">Create new account</h1>
                </div>

                <div className='flex flex-col gap-1.5 w-sm'>
                    <label htmlFor="name" className="block text-sm font-medium paragraph">Name</label>
                    <input id="name" name="name" type="text" required placeholder="John Doe" value={name} onChange={(e) => handleNameChange(e)}
                        className="block rounded-md w-full bg-black/5 px-2 py-1.5 placeholder:text-gray-500 paragraph outline-1 outline-black/10  focus:outline-(--icon-highlight)"
                    />
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

                <button type="submit" disabled={isPending} className="btn w-sm text-sm/6 rounded-md">
                    {isPending ? 'Creating account...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}