import express from 'express'
import { getUser, addRemoveFriend } from 'controller/userController'

const router = express.Router()

router.get('/:userId', getUser)
router.patch("/:userId/:friendId", addRemoveFriend)

export default router