import Link from 'next/link';
import React from 'react';

const Page = ({ children }: any) => {
  return (
    <>
      <div className='flex text-white pt-16'>
        <div className="bg-black h-screen w-1/3 fixed flex flex-col-reverse justify-center pb-2">
          <h2 className='text-white font-bold text-2xl'><Link href='/chat/2f304fc4-36ca-4d38-9b72-e51d96192'>Chat</Link></h2>
        </div>
      </div>
    </>
  );
}

export default Page;
