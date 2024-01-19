import dotenv from 'dotenv'

dotenv.config()

export const frontURL = 'http://localhost:3000'

export const mongoDBConfig = {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
}

export const awsS3Config = {
  bucketName: process.env.S3_BUCKET_NAME,
  accessKey: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
}

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY,
  secretRefreshKey: process.env.JWT_SECRET_REFRESH_KEY,
}
