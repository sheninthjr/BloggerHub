"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginSession from "./LoginSession";
import { CREATE_USER } from "gql";
import { useMutation } from "@apollo/client";

const SideBar = ({ children }: any) => {
  const { data: session } = useSession();
  const user = {
    email: session?.user?.email ?? null,
    name: session?.user?.name ?? null,
    image: session?.user?.image ?? null,
  };

  const [createUser, { data }] = useMutation(CREATE_USER);
  useEffect(() => {
    const handleCreateUser = async () => {
      try {
        const result = await createUser({
          variables: {
            input: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    handleCreateUser();
  }, [session]);

  return (
    <>
      <div className="flex ml-10 h-screen">
        <div className="h-screen ml-96 w-64 bg-gray-900 fixed">
          <div className="flex flex-col h-screen justify-end items-center">
            <div className="pt-28 space-y-10">
              <div className="font-bold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
                <Link href="/">Home</Link>
              </div>
              <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
                <Link href="/profile">Profile</Link>
              </div>
              <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
                <Link href="/chat">Chat</Link>
              </div>
              <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
                <Link href="/post">Post</Link>
              </div>
              <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
                <Link href="/settings">Settings</Link>
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="pb-4 flex flex-col space-y-3 justify-center items-center">
              <LoginSession />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="flex justify-center">{children}</div>
        </main>
      </div>
    </>
  );
};

export default SideBar;
