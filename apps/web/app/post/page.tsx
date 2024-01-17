"use client";
import SuccessButton from "@/ui/components/SuccessButton";
import { useMutation } from "@apollo/client";
import { CreatePost } from "gql";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetails } from "../../../../packages/store/atoms/userDetails";

const page = () => {
  const userState = useRecoilValue(userDetails);
  const userId = userState.id || "";
  const userImage = userState.image || "";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    userId: userId,
    image: userImage,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      userId: userState.id || "",
      image: userState.image || "",
    }));
  }, [userState.id, userState.image]);

  const [createBlogPost, { data }] = useMutation(CreatePost);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  }, [data]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "tags"
          ? value.split(",").map((tag: string) => tag.trim())
          : value,
    }));
  };

  const handleCreateBlogPost = async () => {
    try {
      const result = await createBlogPost({
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="card w-96 shadow-xl bg-gray-900">
          <div className="card-body">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered input-info w-full max-w-xs"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered input-info w-full max-w-xs"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Tags"
                className="input input-bordered input-info w-full max-w-xs"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleCreateBlogPost}
                className="btn btn-primary w-fit"
              >
                Post
              </button>
            </div>
          </div>
        </div>
        {showSuccess && (
          <div className="toast toast-center">
            <SuccessButton />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
