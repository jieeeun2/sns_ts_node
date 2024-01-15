import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from 'model/User'

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      profileImagePath,
      password,
      location,
      occupation
    } = req.body

    const salt =  await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    /* TODO: 프론트에서 넘어온 avatar를 
    백엔드에서 가공을 거쳐서 avatarPath로 변경하는 미들웨어 생성 필요*/

    const user = new User({
      name,
      email,
      password: passwordHash,
      profileImagePath: profileImagePath || '',
      friends: [],
      location: location || '',
      occupation: occupation || '',
      numberOfVisitorsToday: 0,
      totalNumberOfVisitors: 0,
    })
    await user.save()
    res.status(201).json({ message: '회원가입되었습니다.' })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(500).json({ message: '회원가입에 실패했습니다.' })
  }
}

export const test = async () => {
  const user = new User({
    name: 'test',
    email: 'test@test.com',
    password: '1111',
    avatarPath: '', 
    friends: [],
    location: '',
    occupation: '',
    viewedProfile: 0,
    impressions: 0
  })
  await user.save()
}