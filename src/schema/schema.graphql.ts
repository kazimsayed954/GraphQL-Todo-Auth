import {gql} from 'apollo-server'
const typeDefs = gql`

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
    #User Query
    Todos: [Todo]

    #Todo Query
}

type Mutation{
  #User Mutation
  register(user:createUser!): User
  login(user:createUser!):User
  
  #Todo Mutation
  createTodo(todo:createTodo!):Todo 
}

input createUser {
  fullName:String
  email:String!
  password:String!
}

input createTodo {
  title:String!
  description:String
  isDone:Boolean
}
`;
export default typeDefs
