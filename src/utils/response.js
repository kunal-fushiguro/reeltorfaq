export class SuccessResposne {
  constructor(statusCode, message, success, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
  }
}

export class ErrorResposne {
  constructor(statusCode, message, success) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}
