const router = require('express').Router();
const { body } = require('express-validator');
const user_schema = require('../model/user_schema');
const ValidationError = require('../Exceptions/validation_exception');
const multer = require("multer");
const { login, register } = require("../controller/auth_controller");
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public')); // Directory to store the file
  },
  filename: (req, file, cb) => {
    
    if(!file.mimetype.includes("image")){
      cb(new Error("File type not accepted"), false)
    }

    cb(null, Date.now() + file.originalname); // Generate unique filename
  },
});
  
const upload = multer({ storage: storage });

// Register route with validation
router.post(
  '/register',
  upload.single("image"), // Use the upload middleware here
  // Validate email
  body('email')
    .notEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom(async (email) => {
      const user = await user_schema.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      return true;
    }),

  // Validate password
  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  // Validate confirm password
  body('confirm_password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  // Call the register function
  register
);

// Login route
router.post("/login", login);

module.exports = {
  authRoute: router,
}
