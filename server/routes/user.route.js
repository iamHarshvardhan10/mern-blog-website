//  Creating Test Routes

import express from 'express'
import { deleteUser, getUser, signOutUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/test', test)

// update API 
router.put('/update/:userId',verifyUser ,updateUser)

// delete user API 
router.delete('/delete/:deleteId',verifyUser,deleteUser)

// signOut functionality
router.post('/signOut', signOutUser)

// get user functionalit
router.get('/getuser' , verifyUser, getUser)

export default router;