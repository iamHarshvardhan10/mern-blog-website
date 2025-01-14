import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js"

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'))
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'All Fields are Required'))
  }
  const slug = req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-zA-z0-9]/g, '-');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  })
  try {
    const savePost = await newPost.save()
    res.status(201).json(savePost)

  } catch (error) {
    next(error)
  }
}


// get post functionality
export const getPost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};



export const deletePost = async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id == req.user.userId) {

      await Post.findByIdAndDelete(req.params.postId)
      return res.status(200).json({ message: 'Post deleted successfully' })
    }

  } catch (error) {
    next(error)
  }
}

// update post functionality

export const updatePost = async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id == req.params.userId) {
      const post = await Post.findByIdAndUpdate(req.params.postId, {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image
        }
      }, { new: true })
      res.status(200).json(post)
    }
  } catch (error) {
    next(error)
  }
}