const CustomError = require('../exceptions/error_exceptions');
const ValidationError = require('../Exceptions/validation_exception');

/**
 *
 * @param {unknown} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
// const  handError = (err, req, res, next) => {

//     // if (err instanceof CustomError) {
//     //   const errObj = {};
//     //   errObj.message = err.message;

//     //   if(process.env.ENVIRONMENT === "local"){
//     //     errObj.stackTrace = err.stack;
//     //   }

//     //   return res.status(err.statusCode).json(errObj);
//     // }

//     if(err instanceof ValidationError){
//       const errObj = {};
//       errObj.errorMessage = err.message;
//       errObj.errors = err.errors

//       if(process.env.ENVIRONMENT === "local"){
//         errObj.stackTrace = err.stack;
//       }

//       return res.status(err.statusCode).json(errObj);
//     }

//     // file handeling
//     // database connection
//     // authentication error

//     const error = new CustomError(err.message, err.stack);
//     const errorObj = {};
//     errorObj.message = error.message;
//     errorObj.status = error.name;
//     errorObj.stackTrace = err.stackTrace
//     if(process.env.ENVIRONMENT === "local"){
//       errorObj.stackTrace = err.stack;
//     }

//      return res.send(errorObj)
//     }

//     module.exports = handError;

// const handeError = (err, req, res, next) => {
 
//   if (err instanceof ValidationError) {

//     const errObj = {
//       message: err.message,
//       errors: err.errors,
//       stackTrace: err.stack // General stack trace for the error
//     }

//     // If environment is local, include the request stack trace
//     if (process.env.ENVIRONMENT === 'local') {
//       errObj.requestStackTrace = err.RequeststackTrace || err.stack // Use err.RequeststackTrace if available
//     }

//     // Send the error response
//     return res.status(400).json(errObj) // Assuming 400 for validation errors, adjust as needed
//   }

//   // If it's not a ValidationError, pass the error to the next middleware
//   // next(err);
// }
// module.exports = handeError



const handeError = (err, req,res)=>{

  if (err instanceof ValidationError){


    const errObj = {
      message : err.message,
      status : err.status,
      errors : err.errors,
      // stackTrace :err.stack
    }

    console.log(errObj)

    if(process.env.ENVIRONMENT ==="local"){
      errObj.stackTrace = err.stack;
    }

    return res.status(400).json(errObj)

  }
  else{
   const error = new CustomError(err.message, err.stackTrace)
   const errObj = {
    message : err.message,
    status : err.statusCode,
    // stackTrace :err.stack
  }

  if(process.env.ENVIRONMENT ==="local"){
    errObj.stackTrace = err.stack;
  } 

  return res.status(error.statusCode).json(errObj)

  }


  }
module.exports = handeError