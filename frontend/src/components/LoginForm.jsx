"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { login } from "@/fetch/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.accessToken;
      if (!token) {
        setError(true);
      } else {
        Cookies.set("isLoggedIn", "true");
        Cookies.set("accessToken", token);
        setSuccess(true);
        setTimeout(() => {
          router.push("/quest");
        }, 1000);
      }
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleShowPasssword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl font-bold mb-2'>LOGIN</h1>
      <label className='input input-bordered input-info flex items-center gap-2 w-1/3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
          <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
        </svg>
        <input
          type='text'
          className='grow'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className='input input-bordered input-info flex items-center gap-2 w-1/3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
            clipRule='evenodd'
          />
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          className='grow'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
            onClick={handleShowPasssword}
          >
            <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
            <path
              fillRule='evenodd'
              d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        
      </label>
      <button
        className='btn btn-info w-1/3 text-xl font-bold'
        onClick={handleLogin}
      >
        Login
      </button>
      <p className='font-medium'>
        Don't have an account yet?{" "}
        <Link href={"/register"} className='link link-info'>
          Register here!
        </Link>
      </p>
    </div>
  );
}
