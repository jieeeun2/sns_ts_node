import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'
import { awsS3Config } from 'config'

const s3Config = new S3Client({
  credentials: {
    accessKeyId: awsS3Config.accessKey!,
    secretAccessKey: awsS3Config.secretAccessKey!,
  },
  region: 'ap-northeast-2'
})

export const upload = (folderName: string) => multer({
  storage: multerS3({
    s3: s3Config,
    bucket: awsS3Config.bucketName!,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: (req, file, cb) => {
      const filename = file.originalname

      const filenameLength = filename?.length
      const lastDot = filename?.lastIndexOf('.')
      const fileExtension = filename?.substring(lastDot!, filenameLength)
      
      cb(null, `upload/${folderName}/${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtension}`) 
    }
  })
})
