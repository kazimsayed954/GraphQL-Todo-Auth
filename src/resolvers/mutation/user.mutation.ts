import { loginUser, registerUser, uploadProfile } from "../../services/user.service";
import { User } from '../../utils/types/user.type'
import { handleContextError } from "../../utils/contextHandler";

const UserMutation = {
    register: async (_:any,args:{user:User}) => {
        const data = await registerUser(args?.user);
        return data;
    },
    login: async (_:any,args:{user:User}) => {
        const data = await loginUser(args?.user);
        return data;
    },
    uploadProfilePic: async (_:any,args:any,context:any) => {
        if (context && context.error) {
            return handleContextError(context.error)
        }
        const {file} = args;
        const data = await uploadProfile(context?._id,file.file);
        return data;
        
    }
}

export default UserMutation;