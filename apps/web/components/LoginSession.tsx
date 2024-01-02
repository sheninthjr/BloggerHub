"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

const LoginSession = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex justify-between items-center rounded-lg space-x-3 pl-2 pr-2 text-white bg-slate-900">
          <button
            className="flex justify-center items-center w-full h-8"
            onClick={() => signOut()}
          >
            Logout
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </>
    );
  }
};

export default LoginSession;
