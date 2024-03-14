import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import { frontURL, mongoDBConfig } from 'config'
import authRoute from 'route/authRoute'
import postRoute from 'route/postRoute'
import searchRoute from 'route/searchRoute'

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

const { mongoUrl, port } = mongoDBConfig
connect(mongoUrl!)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`))
  })
  .catch((error) => {
    console.log(`${error} did not connect`)
  })

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/search', searchRoute)
