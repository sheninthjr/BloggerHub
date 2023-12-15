"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input) {
      id
      email
      firstname
      lastname
    }
  }
`;

const CreateUserComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });

  const [createUser, { data }] = useMutation(CREATE_USER);

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
      <div className="card w-96 shadow-xl bg-base-100">
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
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Lastname"
              className="input input-bordered input-info w-full max-w-xs"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button onClick={handleCreateUser} className="btn btn-primary w-fit">
              Create User
            </button>
          </div>
        </div>
      </div>
      {data && (
        <div>
          <p>ID: {data.CreateUser.id}</p>
          <p>Email: {data.CreateUser.email}</p>
          <p>Firstname: {data.CreateUser.firstname}</p>
          <p>Lastname: {data.CreateUser.lastname}</p>
        </div>
      )}
    </div>
  );
};

export default CreateUserComponent;
