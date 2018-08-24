import { ExtendableBuiltin } from './utils';

export class BaseError extends ExtendableBuiltin(Error) {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class NotImplementedError extends BaseError {}

export class BaseApiError extends BaseError {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }

  toJSON() {
    const obj = {
      name: this.name,
      status: this.status,
      message: this.message,
    };
    if (this.details) {
      obj.details = this.details;
    }
    return obj;
  }
}

const DEFAULT_FORBIDDEN_MESSAGE = 'Current resource either does not exist'
                              + ' or not enough permissions for'
                              + ' accessing the resource.';

export class ForbiddenError extends BaseApiError {
  constructor(message = DEFAULT_FORBIDDEN_MESSAGE, details = null) {
    super(message, 403, details);
  }
}

export class UnauthorizedError extends BaseApiError {
  constructor(message, details = null) {
    super(message, 401, details);
  }
}

export class BadRequestError extends BaseApiError {
  constructor(message, details = null) {
    super(message, 400, details);
  }
}

export class NotFoundError extends BaseApiError {
  constructor(message, details = null) {
    super(message, 404, details);
  }
}

export class ValidationError extends BadRequestError {
  static fromMongoose(err) {
    const error = err.errors[Object.keys(err.errors)[0]];
    return new ValidationError(error.message, [{
      path: error.path,
      value: error.value,
      message: error.message,
    }]);
  }
}

export class InternalError extends ExtendableBuiltin(Error) {
  constructor(errcode, message) {
    super(message);
    this.message = message;
    this.errcode = errcode;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
