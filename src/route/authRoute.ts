import express from 'express'
import { login, register } from 'controller/authController'
import { upload } from 'middleware/imageUpload'

const router = express.Router()

router.post('/register', upload('profileImage').single('profileImage'), register)
router.post('/login', login)

export default router