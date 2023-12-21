import { gql } from "@apollo/client";

export const USER_DETAIL = gql`
query User($getUserId: ID!) {
  getUser(id: $getUserId) {
    id
    email
    firstname
    lastname
    friends
    sendFriendReq
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