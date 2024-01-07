"use client";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FriendReq, USER_DETAIL, friendsRequest } from "gql";
import { useRecoilValue } from "recoil";
import { userDetails } from "../../../packages/store/atoms/userDetails";
import Skeleton from "./Skeleton";

const UserCard = () => {
  const [sendFriendRequest, { loading: loadingReq }] = useMutation(FriendReq);
  const userState = useRecoilValue(userDetails);
  const { loading: loadingUser, data: userData } = useQuery(friendsRequest, {
    variables: {
      getUserId: userState.id,
    },
  });
  const checkUserFriendlist = userData?.getUser[0].sendFriendReq;

  const { loading, error, data } = useQuery(USER_DETAIL);
  if (loading) return <>Loading...</>;

  const users = data.getAllUser;

  async function handleFriendShip(userId: string) {
    try {
      await sendFriendRequest({
        variables: {
          senderId: userId,
          receiverId: userState.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

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
                      <img
                        className="rounded-2xl"
                        src={user.image}
                        alt={user.name}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-white">{user.name}</div>
                    </div>
                  </div>
                  <div className="pl-2 pr-2 bg-white rounded-lg text-black">
                    <button onClick={() => handleFriendShip(user.id)}>
                      {checkUserFriendlist && checkUserFriendlist.includes(user.id)
                        ? "Requested"
                        : "Follow"}
                    </button>
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

export default UserCard;

