export class BaseException extends Error {
    public readonly statusCode: number;
    public readonly name: string;
  
    constructor(message: string, statusCode = 500, name = "Error") {
      super(message);
      this.statusCode = statusCode;
      this.name = name;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  