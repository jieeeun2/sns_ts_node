import dotenv from 'dotenv'

dotenv.config()

export const frontURL = 'http://localhost:3000'

export const mongoDBConfig = {
  mongoUrl: process.env.MONGO_URI,
  port: process.env.PORT,
}

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY,
  secretRefreshKey: process.env.JWT_SECRET_REFRESH_KEY,
}

export const fileUploadAWSConfig = {
  bucketName: process.env.FILE_UPLOAD_AWS_S3_BUCKET_NAME,
  accessKey: process.env.FILE_UPLOAD_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.FILE_UPLOAD_AWS_SECRET_ACCESS_KEY,
}
