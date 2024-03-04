import express from 'express'
import { login, register } from 'controller/authController'
import uploadFileToS3Bucket from 'middleware/uploadFileToS3Bucket'

const router = express.Router()

router.post('/register', uploadFileToS3Bucket('profileImage').single('profileImage'), register)
router.post('/login', login)

export default router