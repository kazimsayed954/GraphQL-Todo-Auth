import { loginUser, registerUser } from "../../services/user.service";
import { User } from '../../utils/types/user.type'

const UserMutation = {
    register: async (_:any,args:{user:User}) => {
        const data = await registerUser(args?.user);
        return data;
    },
    login: async (_:any,args:{user:User}) => {
        const data = await loginUser(args?.user);
        return data;
    }
}

export default UserMutation;