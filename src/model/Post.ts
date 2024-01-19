import { Schema, Types, model } from 'mongoose'
import { UTCToKST } from 'util/dateFormatter'

interface CommentType {
  userId: Types.ObjectId
  content: string
  isDelete: boolean
}

interface PostType {
  userId: Types.ObjectId
  content: string
  imagePaths: string[]
  likes: Map<string, boolean>
  comments: CommentType[]
}

const CommentSchema = new Schema<CommentType>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  isDelete: { type: Boolean },
}, { 
  timestamps: {
    currentTime: () => UTCToKST(Date.now()),
  },
  versionKey: false
})

const PostSchema = new Schema<PostType>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  imagePaths: [{ type: String }],
  likes: { type: Map, of: Boolean, default: new Map<string, boolean>() },
  comments: [CommentSchema],
}, { 
  timestamps: {
    currentTime: () => UTCToKST(Date.now()),
  },
  versionKey: false 
})

const Post = model<PostType>('Post', PostSchema)

export default Post
