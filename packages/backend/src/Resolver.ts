import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "types";

const prisma = new PrismaClient();

const formatDate = () => {
  const date = new Date();
  const formattedDay = String(date.getDate()).padStart(2, '0');
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const formattedYear = date.getFullYear();
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
  return formattedDate;
};

const resolvers = {
  Mutation: {
    CreateUser: async (_, { input }) => {
      try {
        if (!input) {
          throw new Error("Input is undefined");
        }
        const parsedUser = UserInput.safeParse(input);
        if (parsedUser.success) {
          const { email, firstname, lastname } = input;
          const newUser = await prisma.user.create({
            data: {
              id: randomUUID(),
              email,
              firstname,
              lastname,
            },
          });
          return newUser;
        }
      } catch (e) {
        throw new Error("Failed to create new user");
      }
    },
    sendFriendRequest: async (
      _,
      { senderId, receiverId }: { senderId: string; receiverId: string }
    ) => {
      const senderUser = await prisma.user.findUnique({
        where: { id: senderId },
        select: { sendFriendReq: true },
      });

      const receiverUser = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { sendFriendReq: true },
      });

      if (
        senderUser?.sendFriendReq?.includes(receiverId) ||
        receiverUser?.sendFriendReq?.includes(senderId)
      ) {
        return "Friend request already sent";
      }
      const sendFR = await prisma.user.update({
        where: { id: senderId },
        data: {
          sendFriendReq: { push: receiverId },
        },
      });
      const recFR = await prisma.user.update({
        where: { id: receiverId },
        data: {
          sendFriendReq: { push: senderId },
        },
      });
      if (sendFR && recFR) {
        return "Friend request sent successfully";
      }
    },
    acceptFriendRequest: async (
      _,
      { senderId, receiverId }: { senderId: string; receiverId: string }
    ) => {
      const userWithPendingRequests = await prisma.user.findFirst({
        where: { id: receiverId },
      });
      const acceptUser = await prisma.user.findUnique({
        where: { id: senderId },
        select: { friends: true },
      });

      if (acceptUser?.friends.includes(receiverId)) {
        return "Friend Request Already Accepted";
      }

      const pendingRequests = userWithPendingRequests?.sendFriendReq || [];
      if (pendingRequests.includes(senderId)) {
        if (!userWithPendingRequests?.friends.includes(senderId)) {
          await prisma.user.update({
            where: { id: senderId },
            data: {
              friends: { push: receiverId },
              sendFriendReq: {
                set: pendingRequests.filter(requestId => requestId !== senderId),
              }
            },
          });
          await prisma.user.update({
            where: { id: receiverId },
            data: {
              sendFriendReq: {
                set: pendingRequests.filter(requestId => requestId !== senderId),
              },
            },
          });
          return "Friend request accepted successfully";
        } else {
          return "Friend request already accepted";
        }
      } else {
        return "Friend request not found";
      }
    },
    CreateBlogPost: async (_, { input }) => {
      const { title, description, tags, userId } = input;
      const newBlogPost = await prisma.blogPost.create({
        data: {
          id: randomUUID(),
          title,
          date: formatDate(),
          description,
          tags: {
            set: tags,
          },
          userId,
        },
      });
      return newBlogPost;
    },
  },
  Query: {
    getUser: (_, { id }: { id: string }) =>
      prisma.user.findMany({
        where: { id: id },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          blogPost: true,
          friends: true,
          sendFriendReq: true,
        },
      }),
    blogPost: () => prisma.blogPost.findMany(),
  },
};

export default resolvers;
