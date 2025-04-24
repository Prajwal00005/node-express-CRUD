class CustomError  {
    constructor(message, stackTrace) {
      this.message = message;
      this.name = this.constructor.name; // Set the name to the class name
      this.statusCode =  500; // Add a custom statusCode (optional, default is 500)
      this.stack = stackTrace;
    }
  }
  

  module.exports = CustomError;

