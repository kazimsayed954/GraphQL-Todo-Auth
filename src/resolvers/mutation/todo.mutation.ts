import { createTodo, deleteTodo, updateTodo } from '../../services/todo.service';
import { handleContextError } from '../../utils/contextHandler';
import { Todo } from '../../utils/types/todo.type'

 const TodoMutation = {
    createTodo: async (_:any,args:{todo:Todo},context:any) => {
        if (context && context.error) {
            return handleContextError(context.error)
        }
        const data = await createTodo(args?.todo,context?._id);
        return data;
    },

    updateTodo: async (_:any,args:{todo:Todo,id:string},context:any) => {
        console.log('args', args);
        if (context && context.error) {
            return handleContextError(context.error)
        }
        const data = await updateTodo(args?.todo,args?.id,context?._id);
        return data;
    },

    deleteTodo: async (_:any,args:{id:string},context:any) => {
        if (context && context.error) {
            return handleContextError(context.error)
        }
        const bool = await deleteTodo(args?.id,context?._id);
        return bool
    },  
}

export default TodoMutation;