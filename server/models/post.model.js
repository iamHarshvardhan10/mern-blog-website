import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            default: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png'

        },
        category: {
            type: String,
            default: 'uncategorized'
        },
        slug: {
            type: String,
            require: true,
            unique: true
        }

    }, { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)
export default Post;