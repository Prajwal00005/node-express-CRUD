const { validationResult } = require("express-validator");
const ValidationError = require("../Exceptions/validation_exception");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_schema = require("../model/user_schema");

/**
 * Register User and return JWT token
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */
exports.register = async (req, res, next)=>{
  try {
    console.log(req.body)
    // Validate the request body
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      throw new ValidationError({
        message: "Invalid request",
        errors: result.array({ onlyFirstError: true }),
      });
    }

    // Destructure fields from request body
    const { email, password, name } = req.body;
    const file = req.file;
    const filePath = "/public/"+file.filename;
    console.log(file)

    // Encrypt the password using bcrypt
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Create the user (assuming you are saving this to the database)
    const user = await user_schema.create({
      name: name,
      password: encryptedPassword,
      email: email,
      image: filePath
    });

    // Generate JWT token
    const payload = { id: user.id, email: user.email, name: user.name, image: user.image };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    // Send response with token
    return res.status(201).json({
      message: "User registered successfully",
      token: token, // Sending JWT token to the user
      user: { id: user.id, name: user.name, email: user.email, image: user.image }, // Sending user details
    });
  } catch (error) {
    // console.error(error);

    // If the error is a validation error, it will be handled by ValidationError
    next(error);
  }
};


















module.exports.login = async(req,res,next)=>{
  try{
    const result = validationResult(req);
    if(!result.isEmpty()){
      throw new ValidationError({
        message:"Login failed",
        errors :errors.result({onlyFirstError:true}),
      })
    }

    const { email , password } = req.body;

    const user = await user_schema.findOne({email});
    console.log(user)
    if(!user){
      res.status(400).json({
        sucess:false,
        message:"user doesnot exits"
      })
    }

    const matchedUser = await bcrypt.compare(password, user.password);

    if(!matchedUser){
      res.status(400).json({
        sucess:false,
        message:"creditial failed"
      })
    }

    const payload = {
      id:user.id,
      email:user.email,
      name: user.name
    }
    const token = jwt.sign(payload, process.env.SECRET,{expiresIn:"2h"});

    return res.status(201).json({
      message: "User registered successfully",
      token: token, 
      user: { id: user.id, name: user.name, email: user.email }, // Sending user details
    });


  }catch(e){
    res.status(400).json({
      sucess:false,
      message:"creditial failed",
    })
    // next(e);
  }
}


