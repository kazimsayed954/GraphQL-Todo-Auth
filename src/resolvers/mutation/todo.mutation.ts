import { createTodo } from '../../services/todo.service';
import { handleContextError } from '../../utils/contextHandler';
import { Todo } from '../../utils/types/todo.type'

 const TodoMutation = {
    createTodo: async (_:any,args:{todo:Todo},context:any) => {
        if (context && context.error) {
            handleContextError(context.error)
        }
        const data = await createTodo(args?.todo);
        return data;
    },
}

export default TodoMutation;