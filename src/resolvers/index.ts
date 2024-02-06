import TodoMutation from "./mutation/todo.mutation";
import UserMutation from "./mutation/user.mutation";
import TodoQuery from "./query/todo.query";
import UserQuery from "./query/user.query";

const Query = {
    ...UserQuery,
    ...TodoQuery,
}

const Mutation = {
    ...UserMutation,
    ...TodoMutation,
}

export const resolvers = {
    Query,
    Mutation,
}