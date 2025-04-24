
class ValidationError{
  constructor({message, errors, stackTrace}){
    this.message = message;
    this.errors = errors;
    this.stackTrace = stackTrace
  }
}
module.exports = ValidationError;