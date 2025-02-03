import mongoose from 'mongoose' 
import Post from '../interfaces/post'

const postSchema = new mongoose.Schema<Post>({
    title: {
        type:String,
        required:true
    },
    description :{ 
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:true
    }
},{timestamps:true})


export default mongoose.model('Post',postSchema)