import { Request, Response } from 'express'
import User from 'model/User'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)

    if(!user) return 

    const { _id, ...rest } = user.toObject()
    const responseData = { ...rest, id: _id.toString()}
    
    res.status(200).json({ message: '사용자 정보가 조회되었습니다.', data: { user: responseData } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '사용자 정보 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}
