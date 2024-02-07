const typeDefs = `#graphql
scalar Upload

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
  inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

type User @cacheControl(maxAge: 60){
  id:ID
  fullName:String
  email:String
  token:String
  profileId:ProfileImage
} 

type ProfileImage {
  url:String
}

type Todo{
  _id:ID
  title:String @cacheControl(maxAge:420,scope: PRIVATE)
  description:String
  isDone:Boolean
  userId:User
  createdAt:String
  updatedAt:String
  fullName:String
}

type File {
    filename: String!
    mimetype: String!
    encoding: String!
    profilePic: String

  }

type Query {
    #User Query
    getUserById:User

    #Todo Query
    getTodos:[Todo]
    getTodoById(id:ID):Todo
}

type Mutation{
  #User Mutation
  register(user:createUser): User
  login(user:loginInput):User
  uploadProfilePic(file: Upload):File
  
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
