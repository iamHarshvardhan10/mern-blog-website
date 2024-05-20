import express from 'express'
import { createComment, deletecomment, editcomment, getComments, getcomment, likecomment } from '../controllers/comment.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()


// comment post api
router.post('/create', verifyUser, createComment)

// get all comments
router.get('/getcomment/:postId' ,verifyUser, getComments)

// for like comments

router.put('/likecomment/:commentId' , verifyUser , likecomment)

// for edit comments
router.put('/editcomments/:commentId',verifyUser , editcomment)

// for delete commenents
router.delete('/deletecomment/:commentId',verifyUser , deletecomment)

// get comments
router.get('/getcomments',verifyUser , getcomment)

export default router