"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { userDetails } from "../../../../packages/store/atoms/userDetails";
import { USER_DETAIL } from "gql";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const userState = useRecoilValue(userDetails);
  const { loading, error, data } = useQuery(USER_DETAIL);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const users = data.getAllUser;
  return (
    <>
      <div className="flex flex-col space-y-3">
        {users.map((user: any) =>
          userState.id === user.id ? null : (
            <div key={user.id} className="bg-black">
              <div className="card w-80 flex justify-center items-start p-6 h-20 bg-base-100 shadow-xl border border-slate-400">
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="avatar w-10 h-10">
                      <Link href={`/chat/${user.id}`}>
                        <img
                          className="rounded-2xl"
                          src={user.image}
                          alt={user.name}
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-white">
                        <Link href={`/chat/${user.id}`}>{user.name}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default page;
