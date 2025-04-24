const { validationResult } = require('express-validator')
const postmodel = require('../model/postSchema')
const CustomError = require('../exceptions/error_exceptions')
const ValidationError = require('../exceptions/validation_exception')
const { default: postService } = require('../services/postService')

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
exports.createPost = async (req, res, next) => {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      throw new ValidationError({
        errors: result.array(),
        message: 'Validation failed '
      })
    }

    const { title, body } = req.body

    //image size 100mg

    const postblog = await postmodel.create({ title, body })

   return res.status(200).json({
      sucess: true,
      data: postblog,
      message: 'sucessfully data inserted'
    })
  } catch (e) {
    return next(e)
  }
}

// // Create a new instance of the model
// const response = new postmodel({ title, body });

// // Save the new document to the database
// await response.save();

exports.getPost = async (req, res) => {
  // try {
  //   const getPost = await postmodel
  //     .find({})
  //     .populate('likes')
  //     .populate('comment')
  //     .exec()
  //   res.status(200).json({
  //     sucess: true,
  //     data: getPost,
  //     message: 'sucessfully data fetched'
  //   })
  // } catch (e) {
  //   res.status(401).json({
  //     sucess: false,
  //     data: 'data not fetched',
  //     message: e.message
  //   })
  // }

  await postService.getPost();
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const deletepost = await postmodel.findByIdAndDelete(id)
    res.status(200).json({
      sucess: true,
      data: deletepost,
      message: 'sucessfully data deleted'
    })
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: 'data not fetched',
      message: e.message
    })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, body } = req.body
    const updatepost = await postmodel.findByIdAndUpdate(
      { _id: id },
      { title, body }
    )
    res.status(200).json({
      sucess: true,
      data: updatepost,
      message: 'sucessfully data updated'
    })
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: 'data not updated',
      message: e.message
    })
  }
}
