import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3'
import { fileUploadAWSConfig } from 'config'
import { NextFunction, Request, Response } from 'express'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: fileUploadAWSConfig.accessKey!,
    secretAccessKey: fileUploadAWSConfig.secretAccessKey!,
  },
  region: 'ap-northeast-2'
})

const deleteFileFromS3Bucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imagePaths }: { imagePaths: string[] } = req.body

    if (!imagePaths) return next()

    const ObjectsToDelete: { Key: string }[] = []

    imagePaths?.forEach((imagePath) => {
      const ObjectToDelete = imagePath.substring(imagePath.lastIndexOf('upload/postImage/'))
      ObjectsToDelete.push({ Key: ObjectToDelete })
    })

    const command = new DeleteObjectsCommand({
      Bucket: fileUploadAWSConfig.bucketName!,
      Delete: {
        Objects: ObjectsToDelete,
      },
    })

    const { Deleted } = await s3Client.send(command)
    console.log(`Successfully deleted ${Deleted?.length} objects from S3 bucket. Deleted objects:`)
    console.log(Deleted?.map((d) => ` • ${d.Key}`).join('\n'))

    res.locals.deletedImagePaths = imagePaths
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }
}

export default deleteFileFromS3Bucket
