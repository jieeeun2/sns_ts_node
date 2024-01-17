import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from 'model/User'
import { jwtConfig } from 'config'

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, isAutoLogin } = req.body

    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).json({ message: '존재하지 않는 사용자입니다.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' })
    }

    const accessToken = jwt.sign({ id: user._id }, jwtConfig.secretKey!, { expiresIn: '30m' })
    const refreshToken = jwt.sign({ id: user._id }, jwtConfig.secretRefreshKey!, { expiresIn: '1d' })

    res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    
    const { _id, ...restData } = user.toObject()
    const responseData = {
      id: _id?.toString(),
      ...restData,
    }

    if (isAutoLogin) {
      res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 30 * 60 * 1000 })
      res.status(200).json({ message: '로그인되었습니다.', data: { user: responseData } })
    } else {
      res.status(200).json({ message: '로그인되었습니다.', data: { user: responseData, accessToken } })
    }
  } catch (err: any) {
    console.log({ error: err.message })
    res.status(500).json({ message: '로그인에 실패했습니다.' })
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