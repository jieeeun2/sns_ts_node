import express from 'express'
import { login, register } from 'controller/authController'
import { upload } from 'middleware/ImageUpload'

const router = express.Router()

router.post('/register'/* , upload.single('avatar') */, register)
router.post('/login', login)

export default router