const {
    Post,
    categories
} = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')

// ============================= CREATE A POST
// POST: api/posts
// PROTECTED
const createPost = async(req, res, next) => {
    try {
        const { title, category, description } = req.body
        if(!title || !category || !description || !req.files){
            return next(new HttpError('Fill all fields and choose thumbnail', 422))
        }

        if(!categories.includes(category)){
            return next(new HttpError('Category not supported', 422))
        }

        const { thumbnail } = req.files
        // check the file size
        if(thumbnail.size > 2000000){
            return next(new HttpError('Thumbnail too big. File should be less than 2MB', 422))
        }
        let fileName = thumbnail.name
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async(err) => {
            if(err){
                return next(new HttpError(err))
            }else{
                const newPost = new Post({
                    title,
                    category,
                    description,
                    creator: req.user.id,
                    thumbnail: newFilename
                })
                if(!newPost){
                    return next(new HttpError("Post couldn't be created", 422))
                }
                // find user and increase post count by 1
                const currentUser = await User.findById(req.user.id)
                currentUser.posts += 1
                await currentUser.save()
                // save post
                await newPost.save()

                res.status(201).json({
                    message: 'Post created successfully'
                })
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

// ============================= GET ALL POSTS
// GET: api/posts
// UNPROTECTED
const getPosts = async(req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1}).select('-__v')
        if(!posts){
            return next(new HttpError('No posts found', 404))
        }
        res.status(200).json({
            posts
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}


// ============================= GET SINGLE POST
// GET: api/posts/:id
// UNPROTECTED
const getPost = async(req, res, next) => {
   try {
      const { id: postId } = req.params
      const post = await Post.findById(postId).select('-__v')
      if(!post){
        return next(new HttpError('Post not found', 404))
      }
      res.status(200).json({
        post
      })            
   } catch (error) {
        return next(new HttpError(error))
   }
}

// ============================= GET POSTS BY CATEGORY  
// GET: api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async(req, res, next) => {
    try {
       const { id: category } = req.params
       const posts = await Post.find({category}).select('-__v').sort({updatedAt: -1})
       return res.status(200).json({
              posts
       }) 
    } catch (error) {
        return next(new HttpError(error))
    }
}
// ============================= GET POSTS BY AUTHOR
// GET: api/posts/users/:id
// UNPROTECTED
const getUserPosts = async(req, res, next) => {
    try {
        const { id: userId } = req.params
        const posts = await Post.find({creator: userId}).select('-__v').sort({updatedAt: -1})
        return res.status(200).json({
            posts
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}


// ============================= EDIT POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        let fileName
        let newFilename
        let updatedPost
        const { id: postId } = req.params
        const { title, category, description } = req.body

        if(!categories.includes(category)){
            return next(new HttpError('Category not supported', 422))
        }

        if(!title || !category || description.length < 12){
            return next(new HttpError('Fill all fields and description should be at least 12 characters', 422))
        }

        const post = await Post.findById(postId)
        if(req.user.id !== post.creator.toString()){
            return next(new HttpError('You are not authorized to edit this post', 403))
        }

        if(!req.files){
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
            return res.status(200).json({
                updatedPost          
            })
        } else {
            // get old post from database
            const oldPost = await Post.findById(postId)
            // delete old thumbnail
            fs.unlink(path.join(__dirname, '..', '/uploads', oldPost.thumbnail), async (err) => {
                if(err){
                    return next(new HttpError(err))
                }
            })
            
            // upload new thumbnail
            const { thumbnail } = req.files
            if(thumbnail.size > 2000000){
                return next(new HttpError('Thumbnail too big. File should be less than 2MB', 422))
            }
            fileName = thumbnail.name
            let splittedFilename = fileName.split('.')
            newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
            thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async(err) => {
                if(err){
                    return next(new HttpError(err))
                }
            })

            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFilename}, {new: true})
            return res.status(200).json({
                message: 'Post updated successfully',
            })
        }
    } catch (error) {
        
    }
}


// ============================= DELETE POST
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async(req, res, next) => {
    try {
        const { id: postId } = req.params
        if(!postId){
            return next(new HttpError('Post not found', 400))
        }
        const post = await Post.findById(postId)
        const fileName = post?.thumbnail
        if(req.user.id !== post.creator.toString()){
            return next(new HttpError('You are not authorized to delete this post', 403))
        }
        // delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', '/uploads', fileName), async (err) => {
            if(err){
                return next(new HttpError(err))
            }else{
                await Post.findByIdAndDelete(postId)
                // find user and decrease post count by 1
                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser?.posts - 1
                await User.findByIdAndUpdate(postId, {posts: userPostCount})
            }
        })
        res.status(200).json({
            message: 'Post deleted successfully'
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
}
