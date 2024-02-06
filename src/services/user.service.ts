import * as argon from "argon2";
import UserModel from "../models/User.model";
import { User } from '../utils/types/user.type'
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import ProfileImageModel from "../models/ProfileImage.model";
import MyLib from "../utils/generateUID";

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

export async function uploadProfile(userId:string,file:any){
    const baseUrl = 'http://localhost:7000';
    try {
        const rootDirectory = process.cwd();
        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream();
        const filenameId = MyLib.generateUid();
        const uniqueFileName = `${filenameId}${filename}`
        const pathName = path.join(rootDirectory, 'public', 'images', uniqueFileName);
        await stream.pipe(fs.createWriteStream(pathName));
        const profilePic = `${baseUrl}/images/${uniqueFileName}`;
        let profile:any = null;
        profile = await ProfileImageModel.findOne({userId });
        if(profile){

            const existingImagePath = path.join(rootDirectory, 'public', 'images', profile.url.split('/').pop());
            fs.unlink(existingImagePath, (err) => {
                if (err) {
                    console.error('Error deleting existing image file:', err);
                }
            });
            await ProfileImageModel.findOneAndUpdate({userId},{url:profilePic})
            return {
                profilePic
            }
        }
        const data = await ProfileImageModel.create({url:profilePic,userId})
        await UserModel.findOneAndUpdate({ _id: userId }, { profileId: data?._id }, { new: true });
        
        return {
            profilePic
        }
        
    } catch (error) {
        console.log(error)
    }
}

