const typeDefs = `#graphql

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
  createdAt:String
  updatedAt:String
}


type Query {
    #User Query

    #Todo Query
    getTodos:[Todo]
    getTodoById(id:ID):Todo
}


type Mutation{
  #User Mutation
  register(user:createUser): User
  login(user:loginInput):User
  
  #Todo Mutation
  createTodo(todo:createTodo!):Todo 
  updateTodo(todo:updateTodo,id:ID): Boolean
  deleteTodo(id:ID):Boolean
}

input createUser {
  fullName:String
  email:String!
  password:String!
}

input loginInput {
  email:String!
  password:String!
}

input createTodo {
  title:String!
  description:String
  isDone:Boolean
}

input updateTodo {
  title:String
  description:String
  isDone:Boolean
}
`;
export default typeDefs
