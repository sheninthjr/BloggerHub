"use client";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const USER_DETAIL = gql`
  query User($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      email
      firstname
      lastname
    }
  }
`;
const ProfileCard = () => {
  const [userId, setUserId] = useState("2f304fc4-36ca-4d38-9b72-e51d96192eda");
  const { loading, error, data } = useQuery(USER_DETAIL, {
    variables: {
      getUserId: userId,
    },
  });
  if (loading) {
    return <></>;
  }
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
                {data.getUser[0].firstname} {data.getUser[0].lastname}
              </div>
              <div className="text-slate-400">
                <button>Add Friend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
