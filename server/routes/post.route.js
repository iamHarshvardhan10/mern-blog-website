import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { create, getPost} from '../controllers/post.controller.js'

const router = express.Router()

// Creating Post route

router.post('/create', verifyUser, create)


// get posts
router.get('/getposts', getPost)

export default router