'use client'
import { useQuery, gql } from '@apollo/client';
import { blogPostType } from 'lib';
//@ts-ignore
import Skeleton from '../components/Skeleton';

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

  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
    

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const blogPosts: blogPostType[] = data.blogPost || [];

  return (
    <>
      <div className="p-10 bg-base-100">
      {blogPosts.map((blogPost, index:number) => (
        <div key={index} className="card w-96 bg-slate-500 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">{blogPost.title}</h2>
            <div className="badge badge-warning">{blogPost.date}</div>
            <p>{blogPost.description}</p>
            <div className="card-actions justify-end">
              {Array.isArray(blogPost.tags) &&
                blogPost.tags?.map((tag:any, tagIndex:number) => (
                  <div key={tagIndex} className="badge badge-info">
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default BlogPost;
