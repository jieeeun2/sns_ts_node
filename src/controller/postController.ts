import { Request, Response } from 'express'
import Post from 'model/Post'
import { Types } from 'mongoose'

interface User {
  _id: Types.ObjectId
  name: string
  profileImagePath: string
  location: string
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
      userId: postUserId.toString(),
      ...restUserData,
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

export const getAllPostList = async (req: Request, res: Response) => {
  try {
    const { currentPage }: { currentPage?: string } = req.query
    const pageNumber = currentPage ? parseInt(currentPage) : 1
    const itemsPerPage = 5

    const posts = await Post
      .find()
      .sort({ updatedAt: -1 })
      .populate<{ userId: User }>({
        path: 'userId',
        select: '_id name profileImagePath location'
      })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      
    const responseData = posts.map((post) => {
      const { _id: postId, userId: { _id: userId, ...restUserData }, likes, comments, ...restData } = post.toObject()

      const numberOfLikes = Object.keys(likes).length
      const numberOfComments = comments.length

      return {
        id: postId.toString(),
        userId: userId.toString(),
        ...restUserData,
        numberOfLikes,
        numberOfComments,
        ...restData
      }
    })

    const hasNextPage = responseData.length === itemsPerPage

    res.status(201).json({ message: '게시물 목록이 조회되었습니다.', data: { posts: responseData, hasNextPage } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 목록 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const getPostList = async (req: Request, res: Response) => {
  
}

export const modifyPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const { content } = req.body
    
    //upload미들웨어 리턴값인 '추가된 이미지 경로 배열' 
    const requestFiles = req.files as Express.MulterS3.File[]
    const addedImagePaths = requestFiles.map((file) => file.location)
    console.log('addedImagePaths', addedImagePaths)

    //deleteFileFromS3Bucket미들웨어 리턴값인 '삭제된 이미지 경로 배열'
    console.log('res.locals.deletedImagePaths', res.locals.deletedImagePaths)

    res.status(200).json({ message: '게시물이 수정되었습니다.' })
  } catch (err: any) {  
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 수정에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const removePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params

    await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: '게시물이 삭제되었습니다.', data: { postId } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 삭제에 실패했습니다. 다시 시도해 주세요.' })
  }
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