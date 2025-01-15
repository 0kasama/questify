'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Theme from './Theme';
import { useAuth } from '@/lib/context/authContext';
import { useEffect } from 'react';

export default function Hero() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/quest');
    }
  }, [isAuthenticated, router]);

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <Theme />
          <h1 className='mt-10 text-4xl font-bold'>Welcome to Questify!</h1>
          <p className='py-6'>
            Level Up Your Productivity: Turn Tasks into Quests!
          </p>
          <button className='btn btn-primary w-1/3 mr-2'>
            <Link href={'/login'}>Login</Link>
          </button>
          <button className='btn btn-neutral w-1/3'>
            <Link href={'/register'}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
