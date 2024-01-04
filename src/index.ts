import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { frontURL } from 'config'

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

console.log('port', process.env.PORT)