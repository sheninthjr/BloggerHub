"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginSession = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button
          className="flex justify-center items-center w-24 bg-white rounded-lg h-8 text-red-900"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </>
    );
  }
};

export default LoginSession;
