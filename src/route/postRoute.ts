import express from 'express'
import { createComment, createPost, getAllPostList, getCommentList, getPostList, likePost, modifyComment, modifyPost, removeComment, removePost } from 'controller/postController'
import { upload } from 'middleware/uploadImage'
import deleteFileFromS3Bucket from 'middleware/deleteFileFromS3Bucket'

const router = express.Router()

router.get('/', getAllPostList)
router.get('/:userId', getPostList)
router.post('/', upload('postImage').array('images'), createPost)
router.patch('/:postId', upload('postImage').array('images'), deleteFileFromS3Bucket, modifyPost)
router.delete('/:postId', removePost)

router.get('/:postId/comment', getCommentList)
router.post('/:postId/comment', createComment)
router.patch('/:postId/comment/:commentId', modifyComment)
router.delete('/:postId/comment/:commentId', removeComment)

router.patch(':postId/like', likePost)

export default router