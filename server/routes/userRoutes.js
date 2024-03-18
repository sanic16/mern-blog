const {Router} = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors,
    getProfile
} = require('../controllers/userControllers')

const router = Router()

router.get('/', getAuthors)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getProfile)
router.get('/:id', getUser)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user',authMiddleware, editUser)

module.exports = router