import { GraphQLError } from "graphql";
import { Todo } from "../utils/types/todo.type";
import TodoModel from "../models/Todo.model";

export async function createTodo(todo:Todo,userId:string) {
    try {
        console.log('todo', todo);
        const data = await TodoModel.create({...todo,userId});
        console.log('data', data);
        return data;
    } catch (error: Error | unknown) {
        console.log(error)
    }
}

export async function updateTodo(todo:Todo,todoId:string,userId:string){
    try {
        const data = await TodoModel.updateOne({ _id: todoId, userId }, todo);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTodo(todoId:string,userId:string){
    try {
        const result = await TodoModel.deleteOne({ _id: todoId, userId });
        return result?.deletedCount === 1
    } catch (error) {
    console.log(error)
    }
}