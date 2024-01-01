import React, { useEffect, useState } from 'react'
//@ts-ignore
import SuccessButton from '../components/SuccessButton';
import { gql, useMutation } from '@apollo/client';


const POST = gql`
  mutation CreateBlogPost($input: CreateBlogPost!) {
    CreateBlogPost(input: $input) {
      date
      description
      id
      tags
      title
    }
}`
const CreateBlogPost = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    userId: "2f304fc4-36ca-4d38-9b72-e51d96192eda"
  });

  const [createUser, { data }] = useMutation(POST);

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
      [name]: name === 'tags' ? value.split(',').map((tag: string) => tag.trim()) : value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      const result = await createUser({
        variables: {
          input: formData,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div>
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 shadow-xl bg-red-100">
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
              onClick={handleCreateUser}
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
    </div>
    </>
  )
}

export default CreateBlogPost