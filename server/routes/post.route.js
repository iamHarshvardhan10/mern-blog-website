import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { create, deletePost, getPost, updatePost } from '../controllers/post.controller.js'

const router = express.Router()

// Creating Post route

router.post('/create', verifyUser, create)


// get posts
router.get('/getposts', getPost)

// delete post
router.delete('/deletepost/:postId', verifyUser, deletePost)

// update post api 
router.put('/updatepost/:postId', verifyUser, updatePost)

export default router