"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USER_DETAIL,FriendReq,FriendAcc } from "gql";


const ProfileCard = () => {
  const [userId, setUserId] = useState("2f304fc4-36ca-4d38-9b72-e51d96192eda");
  const [userId1, setUserId1] = useState(
    "ba2317c4-7c79-4c04-a742-3d1b82b3ca49"
  );

  const { loading: loadingUser1, data: userData1 } = useQuery(USER_DETAIL, {
    variables: {
      getUserId: userId,
    },
  });
  const { loading: loadingUser2, data: userData2 } = useQuery(USER_DETAIL, {
    variables: {
      getUserId: userId1,
    },
  });

  const [sendFriendRequest, { loading: loadingReq }] = useMutation(FriendReq);

  const handleAddFriend = async () => {
    try {
      await sendFriendRequest({
        variables: {
          senderId: userId,
          receiverId: userId1,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const [acceptFriend, { loading: loadingAccept }] = useMutation(FriendAcc);
  const handleAcceptFriend = async () => {
    try {
      await acceptFriend({
        variables: {
          senderId: userId,
          receiverId: userId1,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingUser1) {
    return <></>;
  }

  const user = userData1.getUser.find(
    (user: { id: string }) => user.id === userId
  );

  if (loadingUser2) {
    return <></>;
  }
  const user2 = userData2.getUser.find(
    (user: { id: string }) => user.id === userId
  );

  return (
    <>
      <div className="bg-base-100">
        <div className="card w-72 flex justify-center items-start p-6 h-20 bg-base-100 shadow-xl border border-slate-400">
          <div className="flex justify-center items-center space-x-2">
            <div className="avatar">
              <div className="w-10 rounded-full mr-2 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">
                {userData1.getUser[0].firstname} {userData1.getUser[0].lastname}
              </div>
              <div className="text-slate-400">
                {user.sendFriendReq.length > 0 || user.friends.length > 0 ? (
                  <button onClick={handleAcceptFriend}>
                    {user.sendFriendReq.length > 0 ? "Requested" : "Friends"}
                  </button>
                ) : (
                  <button onClick={handleAddFriend}>Add Friend</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100">
        <div className="card w-72 flex justify-center items-start p-6 h-20 bg-base-100 shadow-xl border border-slate-400">
          <div className="flex justify-center items-center space-x-2">
            <div className="avatar">
              <div className="w-10 rounded-full mr-2 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">
                {userData2.getUser[0].firstname} {userData2.getUser[0].lastname}
              </div>
              <div className="text-slate-400">
                {user.sendFriendReq.length > 0 || user.friends.length > 0 ? (
                  <button onClick={handleAcceptFriend}>
                    {user.sendFriendReq.length > 0
                      ? "Accept Friend Request"
                      : "Friends"}
                  </button>
                ) : (
                  <button onClick={handleAddFriend}>Add Friend</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
