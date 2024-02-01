
export const typeDefs = `#graphql

type User{
  id:ID
  fullName:String
  email:String
  password:String
}

type Todo{
  title:String
  description:String
  isDone:Boolean!
  userId:ID!
}


type Query {
    Todos: [Todo]
  }

`;

