//Creating a custom Error class

const AppError = function(message, statusCode){

    Error.call(this,message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')?'FAIL':'ERROR';
    this.isOperational = true;
    
 
    Error.captureStackTrace(this, this.constructor);
}

export default  AppError;