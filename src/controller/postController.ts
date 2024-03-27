import { Request, Response } from 'express'
import { Types } from 'mongoose'
import deleteFileFromS3Bucket from 'middleware/deleteFileFromS3Bucket'
import Post from 'model/Post'

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

    const [post] = await Post.aggregate([
      { $match: { _id: newPost._id } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id', //aggregate를 사용하면 스키마정의에서 toJSON옵션 안먹어서 이렇게
          userId: '$userId',
          name: { $arrayElemAt: ['$user.name', 0] },
          profileImagePath: { $arrayElemAt: ['$user.profileImagePath', 0] },
          location: { $arrayElemAt: ['$user.location', 0] },
          content: 1,
          imagePaths: 1,
          numberOfLikes: { $size: { $objectToArray: '$likes' } },
          numberOfComments: { $size: '$comments' },
          createdAt: 1,
          updatedAt: 1, 
        }
      },
    ])
    
    res.status(201).json({ message: '게시물이 등록되었습니다.', data: { post } })
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

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          userId: '$userId',
          name: { $arrayElemAt: ['$user.name', 0] },
          profileImagePath: { $arrayElemAt: ['$user.profileImagePath', 0] },
          location: { $arrayElemAt: ['$user.location', 0] },
          content: 1,
          imagePaths: 1,
          numberOfLikes: { $size: { $objectToArray: '$likes' } },
          numberOfComments: { $size: '$comments' },
          createdAt: 1,
          updatedAt: 1, 
        }
      },
      { $sort: { updatedAt: -1 } },
      { $skip: (pageNumber - 1) * itemsPerPage },
      { $limit: itemsPerPage }
    ])

    const hasNextPage = posts.length === itemsPerPage

    res.status(200).json({ message: '게시물 목록이 조회되었습니다.', data: { posts, hasNextPage } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 목록 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const getPostList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    
    const { currentPage }: { currentPage?: string } = req.query
    const pageNumber = currentPage ? parseInt(currentPage) : 1
    const itemsPerPage = 5

    const posts = await Post.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          userId: '$userId',
          name: { $arrayElemAt: ['$user.name', 0] },
          profileImagePath: { $arrayElemAt: ['$user.profileImagePath', 0] },
          location: { $arrayElemAt: ['$user.location', 0] },
          content: 1,
          imagePaths: 1,
          numberOfLikes: { $size: { $objectToArray: '$likes' } },
          numberOfComments: { $size: '$comments' },
          createdAt: 1,
          updatedAt: 1, 
        }
      },
      { $sort: { updatedAt: -1 } },
      { $skip: (pageNumber - 1) * itemsPerPage },
      { $limit: itemsPerPage }
    ])

    const hasNextPage = posts.length === itemsPerPage

    res.status(200).json({ message: '사용자 게시물 목록이 조회되었습니다.', data: { posts, hasNextPage } })
  } catch(err: any) {
    console.log({ error: err.message })
    res.status(404).send({ message: '사용자 게시물 목록 조회에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const modifyPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const { content } = req.body 

    //uploadFileToS3Bucket미들웨어 리턴값인 '추가된 이미지 경로 배열' 
    const requestFiles = req.files as Express.MulterS3.File[]
    const addedImagePaths = requestFiles.map((file) => file.location)

    //deleteFileFromS3Bucket미들웨어 리턴값인 '삭제된 이미지 경로 배열'
    const deletedImagePaths = res.locals.deletedImagePaths || []

    //post수정시 이미지 추가나 삭제 이전 '기존의 이미지 경로 배열'
    const existingPost = await Post.findById(postId)
    const existingImagePaths = existingPost?.imagePaths || []

    //기존의 이미지 경로 배열에 추가와 삭제 적용
    const updatedImagePaths = existingImagePaths
      .filter((path) => !deletedImagePaths.includes(path))
      .concat(addedImagePaths)
    
    if (!existingPost) return
    existingPost.content = content
    existingPost.imagePaths = updatedImagePaths
    await existingPost.save()

    //db업데이트 및 조회
    const [post] = await Post.aggregate([
      { $match: { _id: new Types.ObjectId(postId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          userId: '$userId',
          name: { $arrayElemAt: ['$user.name', 0] },
          profileImagePath: { $arrayElemAt: ['$user.profileImagePath', 0] },
          location: { $arrayElemAt: ['$user.location', 0] },
          content: 1,
          imagePaths: 1,
          numberOfLikes: { $size: { $objectToArray: '$likes' } },
          numberOfComments: { $size: '$comments' },
          createdAt: 1,
          updatedAt: 1, 
        }
      },
    ])

    res.status(200).json({ message: '게시물이 수정되었습니다.', data: { post } })
  } catch (err: any) {  
    console.log({ error: err.message })
    res.status(404).send({ message: '게시물 수정에 실패했습니다. 다시 시도해 주세요.' })
  }
}

export const removePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params

    //s3버킷의 이미지 삭제
    const existingPost = await Post.findById(postId)
    const existingImagePaths = existingPost?.imagePaths
    
    if(existingImagePaths?.length !== 0) {
      req.body = { imagePaths: existingImagePaths }
      await deleteFileFromS3Bucket(req, res, () => {})
    }

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