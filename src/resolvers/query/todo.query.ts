import { getTodoById, getTodos } from "../../services/todo.service";
import { handleContextError } from "../../utils/contextHandler";
import { redisClient } from "../../utils/redisClient";

const TodoQuery = {
    getTodos: async (_: any, args: any, context: any) => {
        if (context && context.error) {
            return handleContextError(context.error);
        }

        let key = `userId_todos_${context?._id}`;
        const cachedTodos = await redisClient.get(key);
        if (cachedTodos) return JSON.parse(cachedTodos);

        const todos = await getTodos(context?._id);
        await redisClient.set(key, JSON.stringify(todos));
        await redisClient.expire(key, 30); //30 Sec
        return todos;
    },

    getTodoById: async (_: any, args: { id: string; }, context: any) => {
        if (context && context.error) {
            return handleContextError(context.error);
        }
        const todo = await getTodoById(args?.id, context?._id);
        return todo;
    },
};

export default TodoQuery;