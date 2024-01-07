'use client';

import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { userDetails } from "../../../packages/store/atoms/userDetails";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, UserEmailQuery, UserIdDetails } from "gql";

export default function Init() {
  const { data: session } = useSession();
  const user = {
    email: session?.user?.email ?? null,
    name: session?.user?.name ?? null,
    image: session?.user?.image ?? null,
  };
  const setUserDetail = useSetRecoilState(userDetails)
  const [userId, setUserId] = useState("");
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);

  const { loading: loadingUserEmail, data: userDetail } = useQuery(UserEmailQuery, {
    variables: {
      email: user.email,
    },
    skip: !user.email,
  });

  useEffect(() => {
    const handleCreateUser = async () => {
      try {
        if (!loadingUserEmail && userDetail && userDetail.getUsingEmail && userDetail.getUsingEmail.length === 0) {
          const result = await createUser({
            variables: {
              input: {
                email: user.email,
                name: user.name,
                image: user.image,
              },
            },
          });
          setUserId(result.data.CreateUser.id);
        } else if (userDetail && userDetail.getUsingEmail && userDetail.getUsingEmail.length > 0) {
          setUserId(userDetail.getUsingEmail[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleCreateUser();
  }, [userDetail, createUserLoading]);

  useEffect(() => {
    if (userDetail && userDetail.getUsingEmail) {
      setUserDetail({
        id: userDetail.getUsingEmail[0].id,
        name: userDetail.getUsingEmail[0].name,
        image: userDetail.getUsingEmail[0].image,
      });
    }
  }, [userDetail]);

  return (
    <>
    </>
  )
}
