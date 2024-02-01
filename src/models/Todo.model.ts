import mongoose, { Schema} from 'mongoose';

const Todo = new Schema({
    title: {type: String,required:true},
    description: {type: String},
    isDone: {type: Boolean,default:false},
    userId: {type: Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});

export default mongoose.model("Todo", Todo)
