import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import { GraphQLError } from 'graphql';
export async function getUserByToken(token: string) {
  if (!token) {
    return {
      error: "Token Not Found",
      message: "Please Provide a Valid Token",
    };
  }
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      const user = await UserModel.findOne({ _id: decodedToken.id });
      if (user) return user;
    }
    return {
      error: "Invalid Token",
      message: "Token Expired.",
    };
  } catch (error) {
    return {
      error: "Invalid Token",
      message: "Token Expired.",
    };
  }
}