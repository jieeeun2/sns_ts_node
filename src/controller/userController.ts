import { Request, Response } from 'express'
import User from 'model/User'
import { Types } from 'mongoose'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User
      .findById(
        userId, 
        'id name profileImagePath followers followings location occupation numberOfVisitorsToday totalNumberOfVisitors'
      )
      .populate('followers', 'id name profileImagePath location')
      .populate('followings', 'id name profileImagePath location')

    res.status(200).json({ message: '사용자 정보가 조회되었습니다.', data: { user } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '사용자 정보 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const modifyFollowingList = async (req: Request, res: Response) => {
  try {
    const { userId, targetUserId } = req.params

    const user = await User.findById(userId)
    const targetUser = await User.findById(targetUserId)

    if (!user || !targetUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const userObjectId = new Types.ObjectId(userId)
    const targetUserObjectId = new Types.ObjectId(targetUserId)

    if (user.followings.includes(targetUserObjectId)) {
      user.followings = user.followings.filter((id) => !id.equals(targetUserObjectId))
      targetUser.followers = targetUser.followers.filter((id) => !id.equals(userObjectId))
    } else {
      user.followings.push(targetUserObjectId)
      targetUser.followers.push(userObjectId)
    }

    const updatedUser = await user.save()
    await targetUser.save()

    //비동기를 병렬처리
    const followers = await Promise.all(
      updatedUser.followers.map((id) => (
        User.findById(id, 'id name profileImagePath location')
      ))
    )

    const followings = await Promise.all(
      updatedUser.followings.map((id) => (
        User.findById(id, 'id name profileImagePath location')
      ))
    )
    /* const followings = await User.find(
      { id: { $in: user.followings } }, 
      'id name profileImagePath location'
    ) */

    res.status(200).json({ message: '팔로우 목록이 업데이트 되었습니다.', data: { followers, followings } })
  } catch (err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '팔로우 또는 언팔로우 과정에서 오류가 발생했습니다.' })
  }
}
