import express from 'express'
import { search } from 'controller/searchController'

const router = express.Router()

router.post('/', search)

export default router