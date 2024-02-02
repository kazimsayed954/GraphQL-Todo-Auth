import * as argon from "argon2";
import UserModel from "../models/User.model";
import { User } from '../utils/types/user.type'
import jwt from "jsonwebtoken";

export async function registerUser(user:User){
    const {fullName,email,password} = user;
    try {
        const hashedPassword = await argon.hash(password);
        const user = await UserModel.create({fullName,email,password:hashedPassword});
        return user;       
    } catch (error) {
        console.log(error)
    }
}

export async function loginUser(user:User){
    try {
        const {email,password} = user;
        const userData = await UserModel.findOne({email});
        if(!userData) throw new Error("Not Found User");
        const isPasswordMatch = await argon.verify(userData.password,password);
        if(!isPasswordMatch) throw new Error("Wrong Password Provided");
        const jwtToken  = jwt.sign({id:userData.id},process.env.JWT_SECRET as string,{expiresIn:'12h'});
        const {  password:pwd, ...rest } = userData;   
        return {rest,token:jwtToken}
                       
    } catch (error) {
        console.log(error)
    }
}

