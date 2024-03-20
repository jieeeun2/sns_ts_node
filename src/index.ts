import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import { frontURL, mongoDBConfig } from 'config'
import authRoute from 'route/authRoute'
import postRoute from 'route/postRoute'
import userRoute from 'route/userRoute'
import searchRoute from 'route/searchRoute'
import User from 'model/User'
import Post from 'model/Post'
import { posts, users } from 'mockData'

dotenv.config()

const app = express()

app.use(express.json()) //JSON 형태의 요청 body 파싱
app.use(express.urlencoded({ extended: true })) //x-www-form-urlencoded 형태의 요청 body를 파싱

app.use(helmet())

app.use(morgan('dev'))

const corsConfig = {
  origin: frontURL,
  credentials: true,
}
app.use(cors(corsConfig))

const { mongoUri, port } = mongoDBConfig
connect(mongoUri!)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`))
  })
  .catch((error) => {
    console.log(`${error} did not connect`)
  })

/* User.insertMany(users)
Post.insertMany(posts) */

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/user', userRoute)
app.use('/search', searchRoute)
