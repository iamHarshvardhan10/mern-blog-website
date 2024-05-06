import express from 'express'
import { google, signUp, signin } from '../controllers/auth.controller.js';

const router = express.Router()

// Posting  user info (signUp)
router.post('/signup', signUp)

// User signIn
router.post('/signin', signin)

// Google Auth
router.post('/google',google)

export default router;