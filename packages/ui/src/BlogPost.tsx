"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { blogPostType } from "lib";
import { GET_BLOG_POST } from "gql";
//@ts-ignore
import Skeleton from "../components/Skeleton";
//@ts-ignore
import CreateBlogPost from "./CreateBlogPost";

const BlogPost = () => {
  const { loading, error, data } = useQuery(GET_BLOG_POST);
  const [createMode, setCreateMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsClient(true);
    } else {
      setIsClient(false);
    }
  }, [loading]);

  const handleCreateClick = () => {
    setCreateMode(true);
  };

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
      {isClient ? (
        <Skeleton />
      ) : (
        <div className="">
          {createMode && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="p-8 rounded shadow-lg">
                <CreateBlogPost />
              </div>
            </div>
          )}
          <div
            className={`flex w-1/2 flex-col justify-center items-center space-y-4${
              createMode ? " filter blur-lg" : ""
            }`}
          >
            {reversedBlogPosts.map((blogPost, index: number) => (
              <div
                key={index}
                className="card w-96 bg-black border shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title">
                    <div className="avatar">
                      <div className="w-10 rounded-full mr-2 ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start text-white">
                    {blogPost.title}
                    <div className="text-xs font-light text-slate-400">{blogPost.date}</div>
                    </div>
                    </h2>
                  <p className="text-slate-200 font-medium">{blogPost.description}</p>
                  <div className="card-actions justify-end">
                    {Array.isArray(blogPost.tags) &&
                      blogPost.tags?.map((tag: any, tagIndex: number) => (
                        <div key={tagIndex} className="font-semibold text-slate-400">
                          #{tag}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded shadow"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
      )}
    </>
  );
};

export default BlogPost;
