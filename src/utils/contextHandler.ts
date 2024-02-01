import { GraphQLError } from "graphql";
import { getUserByToken } from "./verifyJWT";

export const contextHandler = async(req:any): Promise<any> => {
    console.log(req.body?.operationName);
            const excludedOperations = ['register', 'login'];
            if(excludedOperations.includes(req.body.operationName)){
                return null;
            }
            const token = req.headers.authorization ?? '';

            const user = await getUserByToken(token);

            if (!user)
            // throwing a `GraphQLError` here allows us to specify an HTTP status code,
            // standard `Error`s will have a 500 status code by default
            throw new GraphQLError('User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            });
      
          return user;
}
