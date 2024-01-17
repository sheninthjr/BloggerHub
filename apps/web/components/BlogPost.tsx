"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { blogPostType } from "lib";
import { GET_BLOG_POST } from "gql";

import { useRecoilValue } from "recoil";
import { userDetails } from "../../../packages/store/atoms/userDetails";

const BlogPost = () => {
  const { loading, error, data } = useQuery(GET_BLOG_POST);
  const [createMode, setCreateMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const userState = useRecoilValue(userDetails);

  useEffect(() => {
    if (loading) {
      setIsClient(true);
    } else {
      setIsClient(false);
    }
  }, [loading]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const blogPosts: blogPostType[] = data.blogPost || [];

  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    //@ts-ignore
    const dateA = new Date(a.lastUpdated).getTime();
    //@ts-ignore
    const dateB = new Date(b.lastUpdated).getTime();
    return dateA - dateB;
  });

  const reversedBlogPosts = sortedBlogPosts.reverse();

  return (
    <>
       <div className="bg-gray-900 flex justify-center pt-8 rounded-2xl pl-10 pr-10 pb-10">
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {reversedBlogPosts.map((blogPost, index: number) => (
            <div key={index} className="card w-96 bg-black border shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title">
                  <div className="avatar">
                    <div className="w-10 rounded-full mr-2 ring ring-slate-700 ring-offset-base-100 ring-offset-1">
                      <img src={blogPost.image} alt="User Image"></img>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start text-white">
                    {blogPost.title}
                    <div className="text-xs font-light text-slate-400">
                      {blogPost.date}
                    </div>
                  </div>
                </h2>
                <p className="text-slate-200 font-medium">
                  {blogPost.description}
                </p>
                <div className="card-actions justify-end">
                  {Array.isArray(blogPost.tags) &&
                    blogPost.tags?.map((tag: any, tagIndex: number) => (
                      <div
                        key={tagIndex}
                        className="font-semibold text-slate-400"
                      >
                        #{tag}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
