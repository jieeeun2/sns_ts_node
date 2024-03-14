import { Request, Response } from 'express'
import Post from 'model/Post'
import User from 'model/User'

export const search = async (req: Request, res: Response) => {
  try {
    const { searchText } = req.body

    const users = await User.find(
      { name: RegExp(searchText, 'i') }, 
      { _id: 1, name: 1, profileImagePath: 1, location: 1 }
    )

    const transformedUsers = users.map((user) => {
      const { _id, ...restUserData } = user.toObject()

      return {
        id: _id.toString(),
        ...restUserData
      }
    })

    const posts = await Post.find(
      { content: RegExp(searchText, 'i') },
      { _id: 1, userId: 1, content: 1, imagePaths: 1, comments: 1}
    )

    const transformedPosts = posts.map((post) => {
      const { _id, userId, ...restPostData } = post.toObject()

      return {
        id: _id.toString(),
        userId: userId.toString(),
        ...restPostData
      }
    })

    const responseData = { users: transformedUsers, posts: transformedPosts }

    res.status(200).json({ message: '검색 결과가 조회되었습니다.', data: { results: responseData } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '검색 결과 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}
