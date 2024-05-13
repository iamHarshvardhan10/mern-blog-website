//  Creating Test Routes

import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/test', test)

// update API 
router.put('/update/:userId',verifyUser ,updateUser)



export default router;