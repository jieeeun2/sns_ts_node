import { Schema, Types, model } from 'mongoose'
import { UTCToKST } from 'util/dateFormatter'

interface UserType {
  name: string
  email: string
  password: string
  avatarPath?: string
  friends?: Types.ObjectId[]
  location?: string
  occupation?: string
  viewedProfile: number
  impressions: number
}

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarPath: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String },
  occupation: { type: String },
  viewedProfile: { type: Number },
  impressions: { type: Number },
}, { 
  timestamps: {
    currentTime: () => UTCToKST(Date.now()),
  }
})

const User = model<UserType>('User', UserSchema)

export default User
