"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
//@ts-ignore
import SuccessButton from "../components/SuccessButton";
import { CREATE_USER } from "gql";



const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    image: "",
  });

  const [createUser, { data }] = useMutation(CREATE_USER);

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
      [name]: value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      const result = await createUser({
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-base-100 h-screen">
      <div className="card w-96 shadow-xl bg-red-100">
        <div className="card-body">
          <div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-info w-full max-w-xs"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Firstname"
              className="input input-bordered input-info w-full max-w-xs"
              name="firstname"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Lastname"
              className="input input-bordered input-info w-full max-w-xs"
              name="lastname"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCreateUser}
              className="btn btn-primary w-fit"
            >
              Create User
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
  );
};

export default CreateUser;
