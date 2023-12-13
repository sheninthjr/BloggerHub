import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from 'fs';
import { UserInput } from 'types'

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const users = [];

const resolvers = {
  Mutation: {
    CreateUser: (_, { input }) => {
      try{
        if (!input) {
          throw new Error("Input is undefined");
        }
        const parsedUser = UserInput.safeParse(input);
        if(parsedUser.success){
          const { email, firstname, lastname } = input;
          const newUser = {
          id: (users.length + 1).toString(),
          email,
          firstname,
          lastname,
        };
        users.push(newUser);
        return newUser;
        }
      }catch(e){
        throw new Error("Failed to create new user")
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
