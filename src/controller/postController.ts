import { Request, Response } from 'express'
import Post from 'model/Post'
import { Types } from 'mongoose'

interface User {
  _id: Types.ObjectId
  name: string
  profileImagePath: string
  location: string
}

export const getAllPostList = async (req: Request, res: Response) => {
  
}

export const getPostList = async (req: Request, res: Response) => {
  
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, content } = req.body

    const requestFiles = req.files as Express.MulterS3.File[]
    const imagePaths = requestFiles.map((file) => file.location)

    const newPost = new Post({ 
      userId: new Types.ObjectId(userId),
      content, 
      imagePaths
    })
    await newPost.save()  

    const populatedPost = await Post
      .findById(newPost._id)
      .populate<{ userId: User }>({
        path: 'userId',
        select: '_id name profileImagePath location'
      })

    if(!populatedPost) return
    
    const { 
      _id: postId, 
      userId: {
        _id: postUserId,
        ...restUserData
      },
      likes,
      comments,
      ...restData
    } = populatedPost.toObject()

    const numberOfLikes = Object.keys(likes).length
    const numberOfComments = comments.length

    const responseData = {
      id: postId.toString(),
      user: {
        userId: postUserId.toString(),
        ...restUserData
      },
      numberOfLikes,
      numberOfComments,
      ...restData
    }

    res.status(201).json({ message: '게시물이 등록되었습니다.', data: responseData })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 등록에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const modifyPost = async (req: Request, res: Response) => {
  
}

export const removePost = async (req: Request, res: Response) => {
  
}

export const getCommentList = async (req: Request, res: Response) => {
  
}

export const createComment = async (req: Request, res: Response) => {
  
}

export const modifyComment = async (req: Request, res: Response) => {
  
}

export const removeComment = async (req: Request, res: Response) => {
  
}

export const likePost = async (req: Request, res: Response) => {
  
}