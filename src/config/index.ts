import dotenv from 'dotenv'

dotenv.config()

export const frontURL = 'http://localhost:3000'

export const mongoDBConfig = {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
}

export const awsS3Config = {
  s3BucketName: process.env.S3_BUCKET_NAME,
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
}