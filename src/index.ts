import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(express.json()) //JSON 형태의 요청 body 파싱
app.use(express.urlencoded({ extended: true })) //x-www-form-urlencoded 형태의 요청 body를 파싱

app.use(helmet())

app.use(morgan('dev'))