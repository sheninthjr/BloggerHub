import React from 'react';

const SideBar = () => {
  return (
    <>
    <div className='fixed w-1/5 h-screen'>
      <div className='flex flex-col h-screen justify-end items-center bg-base-100'>
        <div className='pt-28 space-y-6'>
          <div className='font-bold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            Home
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            Profile
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            Chat
          </div>
          <div className='font-semibold text-lg hover:scale-105 hover:text-3xl transition duration-300'>
            Post
          </div>
        </div>
        <div className='flex-1'></div>
        <div className='font-semibold text-lg pb-4'>
          Settings
        </div>
      </div>
    </div>
    </>
  );
};

export default SideBar;
