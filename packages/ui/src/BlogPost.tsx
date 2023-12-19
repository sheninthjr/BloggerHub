"use client";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { blogPostType } from "lib";
//@ts-ignore
import Skeleton from "../components/Skeleton";
//@ts-ignore
import CreateBlogPost from "./CreateBlogPost";
//@ts-ignore
import ProfileCard from "../components/ProfileCard";

const GET_BLOG_POST = gql`
  query {
    blogPost {
      id
      title
      date
      description
      tags
    }
  }
`;

const BlogPost = () => {
  const { loading, error, data } = useQuery(GET_BLOG_POST);
  const [createMode, setCreateMode] = useState(false);
  const [isClient, setIsClient] = useState(false)
 
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

  return (
    <>
    {isClient ? <Skeleton/> : 
      <div className="bg-base-100">
        {createMode && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="p-8 rounded shadow-lg">
              <CreateBlogPost />
            </div>
          </div>
        )}

        <div
          className={`p-10 flex space-x-4 flex-wrap justify-items-center justify-center${
            createMode ? "filter blur-lg" : ""
          }`}
        >
          {blogPosts.map((blogPost, index: number) => (
            <div key={index} className="card w-96 bg-slate-500 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">{blogPost.title}</h2>
                <div className="badge badge-warning">{blogPost.date}</div>
                <p>{blogPost.description}</p>
                <div className="card-actions justify-end">
                  {Array.isArray(blogPost.tags) &&
                    blogPost.tags?.map((tag: any, tagIndex: number) => (
                      <div key={tagIndex} className="badge badge-info">
                        {tag}
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
      </div>}
    </>
  );
};

export default BlogPost;
