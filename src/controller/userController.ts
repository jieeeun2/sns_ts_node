import { Request, Response } from 'express'
import User from 'model/User'
import { Types } from 'mongoose'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User
      .findById(userId, 
        '_id name profileImagePath friends location occupation numberOfVisitorsToday totalNumberOfVisitors'
      )
      .populate('friends', '_id name profileImagePath location')

    if(!user) return 
    
    const { _id, friends, ...restUserData } = user.toObject()

    const responseData = friends.map((friend) => {
      const { _id: friendId, ...restFriendData } = friend

      return { 
        id: _id.toString(), 
        friends: { id: friendId.toString(), ...restFriendData }, 
        ...restUserData
      }
    })
    
    res.status(200).json({ message: '사용자 정보가 조회되었습니다.', data: { user: responseData } })
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
      user.friends = user.friends.filter((friend) => friend !== friendObjectId)
      friend.friends = friend.friends.filter((friend) => friend !== userObjectId)
    } else {
      user.friends.push(friendObjectId)
      friend.friends.push(userObjectId)
    }

    await user.save()
    await friend.save()

    //비동기를 병렬처리
    const friends = await Promise.all(
      user.friends.map(async (friend) => {
        const user = await User.findById(friend, '_id name profileImagePath location')

        if(!user) return 
        const { _id, ...rest } = user.toObject()

        return { id: _id.toString(), ...rest }
      })
    )

    res.status(200).json({ message: '친구목록이 업데이트 되었습니다.', data: { friends } })
  } catch (err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '친구목록이 업데이트에 실패했습니다. 다시 시도해 주세요.' })
  }
}
