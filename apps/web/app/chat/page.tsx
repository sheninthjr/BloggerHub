import React from 'react';

const Page = ({ children }: any) => {
  return (
    <>
      <div className='flex text-white pt-16'>
        <div className="bg-black h-screen w-1/3 fixed flex flex-col-reverse pb-2">
          <div
            className="text-black flex flex-col items-end overflow-y-auto pr-4 pb-10"
          >
            Message
          </div>
          <div className="flex justify-between p-4">
            <input
              type="text"
              placeholder="Waiting For your message"
              className="w-full bg-slate-800 border border-black focus:bg-slate-800 focus:outline-none text-white rounded-lg px-4 py-2"
            />
            <button
              className="bg-slate-900 w-10 rounded-xl ml-4 text-3xl"
            >{`>`}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
