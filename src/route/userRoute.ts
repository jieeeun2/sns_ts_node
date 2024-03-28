import express from 'express'
import { getUser, getFollowList, modifyFollowingList } from 'controller/userController'

const router = express.Router()

router.get('/:userId', getUser)
router.get('/:userId/follows', getFollowList)
router.patch("/:userId/:targetUserId", modifyFollowingList)

export default router