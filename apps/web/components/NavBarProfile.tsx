"use client";
import React from "react";
import { useSession } from "next-auth/react";

const NavBarProfile = () => {
  const { data: session } = useSession();

  return (
    <>
      <img
        className="w-8 h-8 rounded-2xl"
        src={session?.user?.image ?? ""}
        alt=""
      />
    </>
  );
};

export default NavBarProfile;
