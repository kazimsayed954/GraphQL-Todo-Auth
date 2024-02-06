import { getUserById } from "../../services/user.service";
import { handleContextError } from "../../utils/contextHandler";

const UserQuery = {
    getUserById: async (_: any, args: any, context: any) => {
        if (context && context.error) {
            return handleContextError(context.error);
        }
        const user = await getUserById(context?._id);
        return user;
    },
};

export default UserQuery;