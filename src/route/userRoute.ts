import express from 'express'
import { getUser, modifyFollowingList } from 'controller/userController'

const router = express.Router()

router.get('/:userId', getUser)
router.patch("/:userId/:targetUserId", modifyFollowingList)

export default router