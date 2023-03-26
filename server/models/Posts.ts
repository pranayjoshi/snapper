import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        userPicturePath: String,
        picturePath: String,
        friends: {
            type: Array,
            default: []
        },
        location: String,
        description: String,
        impressions: Number,
        likes: {
            type: Map,
            of: Boolean
        },
        Comments: {
            type: Array,
            default: []
        }
        
    },
    {timestamps: true}
);

const Post = mongoose.model("Post", PostSchema)

export default Post;