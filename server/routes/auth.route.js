import express from 'express'
import { signUp, signin } from '../controllers/auth.controller.js';

const router = express.Router()

// Posting  user info (signUp)
router.post('/signup', signUp)

// User signIn
router.post('/signin', signin)

export default router;