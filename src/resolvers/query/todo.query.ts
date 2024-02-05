import { getTodoById, getTodos } from "../../services/todo.service";
import { handleContextError } from "../../utils/contextHandler";

const TodoQuery = {
   getTodos:async (_:any,args:any,context:any) => {
    if (context && context.error) {
        return handleContextError(context.error)
    }
        const todos = await getTodos(context?._id);
        return todos;
   },

   getTodoById:async (_:any,args:{id:string},context:any) => {
    if (context && context.error) {
        return handleContextError(context.error)
    }
        const todo = await getTodoById(args?.id,context?._id);
        return todo;
   },
}

export default TodoQuery;