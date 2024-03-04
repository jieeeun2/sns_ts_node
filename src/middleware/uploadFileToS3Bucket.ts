import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'
import { fileUploadAWSConfig } from 'config'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: fileUploadAWSConfig.accessKey!,
    secretAccessKey: fileUploadAWSConfig.secretAccessKey!,
  },
  region: 'ap-northeast-2'
})

const uploadFileToS3Bucket = (folderName: string) => multer({
  storage: multerS3({
    s3: s3Client,
    bucket: fileUploadAWSConfig.bucketName!,
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

export default uploadFileToS3Bucket
