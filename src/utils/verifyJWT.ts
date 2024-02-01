import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import { GraphQLError } from 'graphql';
export async function getUserByToken(token: string) {
    if (!token) {
        throw new GraphQLError('Please Provide a Access Token', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET as string) as any;
        const user = await UserModel.findOne({_id:decodedToken.id})
        if(user)  return user
        throw new GraphQLError('Please Provide a Valid Token', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
    } catch (error) {
        console.log(error)
    }  
}