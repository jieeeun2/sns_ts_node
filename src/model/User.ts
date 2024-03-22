import { Schema, Types, model } from 'mongoose'
import { UTCToKST } from 'util/dateFormatter'

interface UserType {
  name: string
  email: string
  password: string
  profileImagePath: string
  friends: Types.ObjectId[]
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
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
