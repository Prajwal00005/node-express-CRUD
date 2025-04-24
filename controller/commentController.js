const comment = require('../model/commentSchema')
const Post = require('../model/postSchema')

exports.comment = async (req, res) => {
  try {
    const { post, user, body } = req.body

    const comment = new comment({ post, user, body })

    const savedcomment = await comment.save()

    //find the post by id and new comments to its comments array

    const updatePost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedcomment._id } },
      { new: true }
    )
      .populate('comments')
      .exec()

    res.status(200).json({
      sucess: true,
      post: updatePost,
      message: 'sucessfully comment inserted'
    })
  } catch (e) {
    res.status(400).json({
      sucess: false,
      data: 'comment not inserted',
      message: e.message
    })
  }
}
