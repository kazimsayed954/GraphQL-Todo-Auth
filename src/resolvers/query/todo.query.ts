import { getTodos } from "../../services/todo.service";
import { handleContextError } from "../../utils/contextHandler";

const TodoQuery = {
   getTodos:async (_:any,args:any,context:any) => {
    if (context && context.error) {
        return handleContextError(context.error)
    }
        const todos = await getTodos(context?._id);
        return todos;
   },
}

export default TodoQuery;