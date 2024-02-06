import { getUserById } from "../../services/user.service";
import { handleContextError } from "../../utils/contextHandler";
import { redisClient } from "../../utils/redisClient";

const UserQuery = {
    getUserById: async (_: any, args: any, context: any, info: any) => {
        console.log('info', info?.cacheControl);
        if (context && context.error) {
            return handleContextError(context.error);
        }
        let key = `userId_${context?._id}`;
        const cachedUser = await redisClient.get(key);
        if (cachedUser) return JSON.parse(cachedUser);
        const user = await getUserById(context?._id);
        await redisClient.set(key, JSON.stringify(user));
        await redisClient.expire(key, 30); //30 Sec
        return user;
    },
};

export default UserQuery;