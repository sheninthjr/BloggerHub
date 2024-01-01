'use client';
import React from 'react';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import LoginSession from './LoginSession';

const SideBar = () => {
  const { data: session } = useSession();
  const user = {
    email: session?.user?.email ?? null,
    name: session?.user?.name ?? null,
    image: session?.user?.image ?? null,
  };
  return (
    <>
    <div className='h-screen bg-black'>
      <div className='flex flex-col h-screen justify-end items-center'>
        <div className='pt-28 space-y-10'>
          <div className='font-bold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            <Link href='/'>Home</Link>
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            <Link href='/profile'>Profile</Link>
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            <Link href='/chat'>Chat</Link>
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            <Link href='/post'>Post</Link>
          </div>
        </div>
        <div className='flex-1'></div>
        <div className='pb-4 flex flex-col space-y-3 justify-center items-center'>
        <LoginSession/>
          <Link href='/settings' className='font-semibold text-lg'>Settings</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default SideBar;
