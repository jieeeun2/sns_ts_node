import { Request, Response } from 'express'
import User from 'model/User'
import { Types } from 'mongoose'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User
      .findById(userId, 
        'id name profileImagePath friends location occupation numberOfVisitorsToday totalNumberOfVisitors'
      )
      .populate('friends', 'id name profileImagePath location')

    res.status(200).json({ message: '사용자 정보가 조회되었습니다.', data: { user } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '사용자 정보 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params

    const user = await User.findById(userId)
    const friend = await User.findById(friendId)

    if(!user) return
    if(!friend) return

    const userObjectId = new Types.ObjectId(userId)
    const friendObjectId = new Types.ObjectId(friendId)

    if (user.friends.includes(friendObjectId)) {
      user.friends = user.friends.filter((id) => !id.equals(friendObjectId))
      friend.friends = friend.friends.filter((id) => !id.equals(userObjectId))
    } else {
      user.friends.push(friendObjectId)
      friend.friends.push(userObjectId)
    }

    await user.save()
    await friend.save()

    //비동기를 병렬처리
    const friends = await Promise.all(
      user.friends.map((id) => (
        User.findById(id, 'id name profileImagePath location')
      ))
    )

    res.status(200).json({ message: '친구목록이 업데이트 되었습니다.', data: { friends } })
  } catch (err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '친구목록이 업데이트에 실패했습니다. 다시 시도해 주세요.' })
  }
}
