import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import { frontURL } from 'config'
import authRoute from 'route/authRoute'
import { test } from 'controller/authController'

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

connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Port: ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(`${error} did not connect`)
  })

app.post('/auth', authRoute)

test().then(() => console.log('생성성공')).catch(err => console.log(err))