import { Schema, Types, model } from 'mongoose'

interface CommentType {
  userId: Types.ObjectId
  content: string
  isDelete: boolean
}

interface PostType {
  userId: Types.ObjectId
  content: string
  imagePaths?: string[]
  like?: Map<string, boolean>
  comments?: CommentType[]
}

const CommentSchema = new Schema<CommentType>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  isDelete: { type: Boolean },
}, { 
  timestamps: true,
  versionKey: false
})

const PostSchema = new Schema<PostType>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  imagePaths: [{ type: String }],
  like: { type: Map, of: Boolean },
  comments: [CommentSchema],
}, { 
  timestamps: true,
  versionKey: false 
})

const Post = model<PostType>('Post', PostSchema)

export default Post
