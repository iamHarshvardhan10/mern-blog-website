import express from 'express'
import { createComment, getComments } from '../controllers/comment.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()


// comment post api
router.post('/create', verifyUser, createComment)

// get all comments
router.get('/getcomment/:postId' ,verifyUser, getComments)

export default router