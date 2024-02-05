import path from "path";
import { loginUser, registerUser } from "../../services/user.service";
import { User } from '../../utils/types/user.type'
import fs from "fs";
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
        const rootDirectory = process.cwd();
        const { createReadStream, filename, mimetype, encoding } = await file?.file;
        const stream = createReadStream();
        const pathName = path.join(rootDirectory, 'public', 'images', filename);
        await stream.pipe(fs.createWriteStream(pathName))
        return {
            profilePic:`http://localhost:7000/images/${filename}`
        }
    }
}

export default UserMutation;