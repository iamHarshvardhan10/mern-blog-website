import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs'
export const test = (req, res) => {
  res.json({
    message: 'Test API Created!!!'
  })
}


// update user Fuction

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          imageUrl: req.body.imageUrl,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}


// Delete Useer

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.deleteId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'))
  }
  try {
    await User.findByIdAndDelete(req.params.deleteId)
    res.status(200).json({ message: 'User Deleted Successfully' })
  } catch (error) {
    next(error)
  }
}

// signOut user

export const signOutUser = async (req, res, next) => {
  try {

    res.clearCookie('access_token').status(200).json('User Has Been SignOut')
  } catch (error) {
    next(error)
  }
}

// get user functionality

export const getUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to get this user'))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection })
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest
    })
    const totalUsers = await User.countDocuments();
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },

    })
    res.status(200).json({ users: userWithoutPassword, totalUsers, lastMonthUsers })
  } catch (error) {
    next(error)
  }
}

// comment for all users

export const getUsers = async(req,res,next) => {
  try {
    const user = await User.findById(req.params.userId)
    if(!user){
      return next(errorHandler(404,'User not Found'))
    }
    const {passowrd , ...rest} = user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}