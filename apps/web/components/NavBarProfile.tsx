"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

const NavBarProfile = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <img
          className="w-8 h-8 rounded-2xl"
          src={session?.user?.image ?? ""}
          alt=""
        />
      </>
    );
  }
  return (
    <>
      <button
        className="flex justify-center items-center w-24 bg-white rounded-lg h-8 text-blue-900"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </>
  );
};

export default NavBarProfile;
