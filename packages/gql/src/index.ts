import { gql } from "@apollo/client";

export const USER_DETAIL = gql`
  query GetAllUser {
    getAllUser {
      id
      email
      name
      image
    }
  }
`;

export const UserIdDetails = gql`
query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    id
    email
    name
    image
  }
}`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input) {
      id
      email
      name
      image
    }
  }
`;

export const FriendReq = gql`
mutation SendFriendRequest($senderId: ID!, $receiverId: ID!) {
  sendFriendRequest(senderId: $senderId, receiverId: $receiverId)
}
`;

export const FriendAcc = gql`
mutation AcceptFriendRequest($senderId: ID!, $receiverId: ID!) {
  acceptFriendRequest(senderId: $senderId, receiverId: $receiverId)
}
`;

export const GET_BLOG_POST = gql`
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