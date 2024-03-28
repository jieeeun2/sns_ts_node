import { Schema, Types, model } from 'mongoose'
import { UTCToKST } from 'util/dateFormatter'

interface UserType {
  name: string
  email: string
  password: string
  profileImagePath: string
  followers: Types.ObjectId[]
  followings: Types.ObjectId[]
  location: string
  occupation: string
  numberOfVisitorsToday: number
  totalNumberOfVisitors: number
}

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImagePath: { type: String },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], //나를 추가한 친구목록
  followings: [{ type: Schema.Types.ObjectId, ref: 'User' }], //내가 추가한 친구목록
  location: { type: String },
  occupation: { type: String },
  numberOfVisitorsToday: { type: Number },
  totalNumberOfVisitors: { type: Number },
}, { 
  timestamps: {
    currentTime: () => UTCToKST(Date.now()),
  },
  versionKey: false,
  toJSON: { 
    transform: (doc, ret, options) => { 
      ret.id = ret._id
      delete ret._id
    } 
  },
})

const User = model<UserType>('User', UserSchema)

export default User
