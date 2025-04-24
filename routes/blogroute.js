const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')

const {
  createPost,
  deletePost,
  updatePost,
  getPost
} = require('../controller/postController')

const { comment } = require('../controller/commentController')
const { like, unlikepost } = require('../controller/likeController')
const { authRoute } = require('./auth_route')

router.use("/auth", authRoute)

router.post(
  '/createblog',
  body('title')
    .notEmpty()
    .withMessage('Title field in required')
    .isLength({ min: 1, max: 255 })
    .withMessage("Max length is 255 characters"),
  body('body').notEmpty().withMessage('body field is required'),
  createPost
)


router.delete('/deleteblog/:id', deletePost)
router.get('/getblog', getPost)
router.put('/updateblog/:id', updatePost)
router.post('/comment', comment)
// router.post('/login',login)
// router.post("/likes/like",like)
// router.post("/likes/unlikes",unlikepost)

module.exports = router
