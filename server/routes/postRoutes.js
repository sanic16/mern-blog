const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
} = require('../controllers/postControllers')

const router = Router()

router.route('/').post(authMiddleware, createPost).get(getPosts)
router.route('/:id').get(getPost).patch(authMiddleware, editPost).delete(authMiddleware, deletePost)
router.get('/categories/:id', getCatPosts)
router.get('/users/:id', getUserPosts)


module.exports = router