import express from 'express'
import { createComment } from '../controllers/comment.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()


// comment post api
router.post('/create', verifyUser, createComment)

export default router