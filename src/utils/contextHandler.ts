import { getUserByToken } from "./verifyJWT";
import { parse, print,getIntrospectionQuery, GraphQLError } from 'graphql';

const introspectionQuery = print(parse(getIntrospectionQuery()));

export const contextHandler = async(req:any): Promise<any> => {
  if (req.body.query === introspectionQuery) {
    return {};
  }

  const excludedOperations = ["register","login"];
  if(excludedOperations.includes(req.body.operationName)){
      return null;
  }
  const token = req.headers.authorization ?? '';
  let user;
  if(token){
    user = await getUserByToken(token);
    if(!user){
      return {
        error: "Unauthorized User",
        message: "User Not Found in Database.",
      };
    }

    return user;
  }

  return {
    error: "Missing token",
    message: "Authorization token is required for this operation.",
  };

}

export const handleContextError = (error:GraphQLError) => {
        throw new GraphQLError(error?.message, {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
    
}