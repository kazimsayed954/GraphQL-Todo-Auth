import mongoose, { Schema} from 'mongoose';

const ProfileImage = new Schema({
    url:{type: String,required:true},
    userId: {type: Schema.Types.ObjectId,ref:"User",required:true}
});

export default mongoose.model("ProfileImage", ProfileImage)
