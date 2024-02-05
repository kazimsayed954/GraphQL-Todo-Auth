import { GraphQLError } from "graphql";
import { Todo } from "../utils/types/todo.type";
import TodoModel from "../models/Todo.model";

export async function createTodo(todo:Todo,userId:string) {
    try {
        const data = await TodoModel.create({...todo,userId});
        return data;
    } catch (error: Error | unknown) {
        console.log(error)
    }
}

export async function updateTodo(todo:Todo,todoId:string,userId:string){
    try {
        const result = await TodoModel.updateOne({ _id: todoId, userId }, todo);
        return result?.acknowledged;
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
export async function getTodos(userId:string) {
    try {
        const todos = await TodoModel.find({userId});
        return todos;
    } catch (error) {
        console.log(error)        
    }
}

export async function getTodoById(todoId:string,userId:string) {
    try {
        const todo = await TodoModel.findOne({_id:todoId,userId}).populate("userId");
        return todo;
    } catch (error) {
        console.log(error)        
    }
}