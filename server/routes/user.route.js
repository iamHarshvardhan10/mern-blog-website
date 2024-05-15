//  Creating Test Routes

import express from 'express'
import { deleteUser, signOutUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/test', test)

// update API 
router.put('/update/:userId',verifyUser ,updateUser)

// delete user API 
router.delete('/delete/:deleteId',verifyUser,deleteUser)

// signOut functionality
router.post('/signOut', signOutUser)

export default router;