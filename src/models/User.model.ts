import mongoose, { Schema} from 'mongoose';

const User = new Schema({
    fullName: {type: String,required:true},
    email: {type: String,required:true,unique:true},
    password: {type: String,required:true},
});

export default mongoose.model("User", User)
