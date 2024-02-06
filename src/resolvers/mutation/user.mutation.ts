import { loginUser, registerUser, uploadProfile } from "../../services/user.service";
import { User } from '../../utils/types/user.type';
import { handleContextError } from "../../utils/contextHandler";
import { GraphQLError } from "graphql";

const UserMutation = {
    register: async (_: any, args: { user: User; }) => {
        const data: any = await registerUser(args?.user);
        if (data?.error) {
            throw new GraphQLError(data?.error, {
                extensions: {
                    code: data?.code,
                    http: { status: data?.status },
                },
            });
        }
        return data;
    },
    login: async (_: any, args: { user: User; }) => {
        const data = await loginUser(args?.user);
        if (data?.error) {
            throw new GraphQLError(data?.error, {
                extensions: {
                    code: data?.code,
                    http: { status: data?.status },
                },
            });
        }
        return data;
    },
    uploadProfilePic: async (_: any, args: any, context: any) => {
        if (context && context.error) {
            return handleContextError(context.error);
        }
        const { file } = args;
        const data = await uploadProfile(context?._id, file.file);
        if (data?.error) {
            throw new GraphQLError(data?.error, {
                extensions: {
                    code: data?.code,
                    http: { status: data?.status },
                },
            });
        }
        return data;

    }
};

export default UserMutation;