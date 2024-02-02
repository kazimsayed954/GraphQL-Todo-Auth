"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

type User{
  id:ID
  fullName:String
  email:String
  password:String
  token:String
}

type Todo{
  title:String
  description:String
  isDone:Boolean
  userId:ID
}


type Query {
    Todos: [Todo]
}

type Mutation{
  register(user:createUser): User
  login(user:createUser):User
}

input createUser{
  fullName:String
  email:String!
  password:String!
}
`;
