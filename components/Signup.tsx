import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import prisma from '@/lib/prisma';

export default function SignUpPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const handleEmailSignUp = async () => {
        const res = await signIn("credentials", {
            email: username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Signup failed. Please try again.');
        } else {
            
            try {
                await prisma.user.create({
                    data: {
                        email: username,
                        
                    },
                });
                console.log('User created in the database');
                router.push('/'); 
            } catch (error) {
                console.error('Error creating user in the database:', error);
                setError('Error creating your account. Please try again later.');
            }
        }
    };

    const handleProviderSignIn = async (provider: any) => {
        const res = await signIn(provider, { redirect: false });

        if (res?.error) {
            setError('Sign-in failed. Please try again.');
        } else {
           
            const session = await getSession();

           
            try {
                await prisma.user.create({
                    data: {
                        email: session?.user?.email || "",
                    },
                });
                console.log('User created in the database');
                router.push('/');
            } catch (error) {
                console.error('Error creating user in the database:', error);
                setError('Error creating your account. Please try again later.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="mb-4 flex space-x-4">
                <Button onClick={() => handleProviderSignIn("google")} variant="primary" size="medium" className="flex items-center justify-center">
                    <img src="/google-logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
                    Sign Up with Google
                </Button>
                <Button onClick={() => handleProviderSignIn("github")} variant="secondary" size="medium" className="flex items-center justify-center">
                    <img src="/github-logo.svg" alt="GitHub Logo" className="w-5 h-5 mr-2" />
                    Sign Up with GitHub
                </Button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleEmailSignUp(); }} className="w-full max-w-xs">
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={() => {}} type="submit" variant="primary" size="medium">
                    Sign Up with Email
                </Button>
            </form>
        </div>
    );
}