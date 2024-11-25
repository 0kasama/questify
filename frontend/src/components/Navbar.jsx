'use client';

import Link from 'next/link';
import Theme from '@/components/Theme';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('isLoggedIn');
    router.push('/');
  };

  return (
    <div className='navbar bg-base-100 shadow-xl'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>
            <li>
              <Link href={'/quest'}>Quests</Link>
            </li>
            <li>
              <a className='text-red-500' onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <Link href={'/quest'} className='btn btn-ghost text-xl'>
          Questify
        </Link>
      </div>
      <div className='navbar-end pr-2'>
        <Theme />
      </div>
    </div>
  );
}
