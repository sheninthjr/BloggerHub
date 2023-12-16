import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "types";

const prisma = new PrismaClient();

const formatDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
};

const resolvers = {
  Mutation: {
    CreateUser: (_, { input }) => {
      try {
        if (!input) {
          throw new Error("Input is undefined");
        }
        const parsedUser = UserInput.safeParse(input);
        if (parsedUser.success) {
          const { email, firstname, lastname } = input;
          const newUser = {
            id: randomUUID(),
            email,
            firstname,
            lastname,
          };
          return newUser;
        }
      } catch (e) {
        throw new Error("Failed to create new user");
      }
    },
    CreateBlogPost: async (_, { input }) => {
      const { title, description, tags } = input;
      const newBlogPost = await prisma.blogPost.create({
        data: {
          id: randomUUID(),
          title,
          date:formatDate(),
          description,
          tags: {
            set: tags,
          },
        },
      });
      return newBlogPost;
    },
  },
  Query: {
    blogPost: () => prisma.blogPost.findMany(),
  },
};

export default resolvers;
